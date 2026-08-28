import {
  Injectable,
  NotFoundException,
  ForbiddenException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Quiz } from './entities/quiz.entity';
import { Question } from './entities/question.entity';
import { QuizAttempt } from './entities/quiz-attempt.entity';
import { Enrollment } from '../enrollments/entities/enrollment.entity';
import { CreateQuizDto } from './dto/CreateQuizDto';
import { SubmitQuizDto } from './dto/SubmitQuizDto';
import { CoursesService } from '../courses/courses.service';
import { Progress } from 'src/progress/entities/progress.entity';

@Injectable()
export class QuizzesService {
  constructor(
    @InjectRepository(Quiz)
    private quizRepository: Repository<Quiz>,
    @InjectRepository(Question)
    private questionRepository: Repository<Question>,
    @InjectRepository(QuizAttempt)
    private attemptRepository: Repository<QuizAttempt>,
    @InjectRepository(Enrollment)
    private enrollmentRepository: Repository<Enrollment>,
    @InjectRepository(Progress) // 👈 Repository Inject Karni Hogi
    private lessonProgressRepository: Repository<Progress>,
    private coursesService: CoursesService,
  ) {}

  // Instructor: create a quiz with its questions in one go
  async create(
    courseId: number,
    instructorId: number,
    dto: CreateQuizDto,
  ): Promise<Quiz> {
    const course = await this.coursesService.findOne(courseId);
    if (course.instructor.id !== instructorId) {
      throw new ForbiddenException(
        'You can only add quizzes to your own courses',
      );
    }

    const quiz = this.quizRepository.create({
      title: dto.title,
      passingScore: dto.passingScore ?? 70,
      course: { id: courseId } as any,
    });
    const savedQuiz = await this.quizRepository.save(quiz);

    const questions = dto.questions.map((q) =>
      this.questionRepository.create({
        text: q.text,
        options: q.options,
        correctAnswerIndex: q.correctAnswerIndex,
        quiz: { id: savedQuiz.id } as any,
      }),
    );
    await this.questionRepository.save(questions);

    return this.findOne(savedQuiz.id);
  }

  async findOne(id: number): Promise<Quiz> {
    const quiz = await this.quizRepository.findOne({
      where: { id },
      relations: { questions: true, course: { instructor: true } },
    });
    if (!quiz) {
      throw new NotFoundException('Quiz not found');
    }
    return quiz;
  }

  async findAllByCourse(courseId: number): Promise<Quiz[]> {
    return this.quizRepository.find({
      where: { course: { id: courseId } },
      relations: { questions: true },
    });
  }

  // =========================================================
  // ⚡ FIX: LESSON COMPLETE BACKEND LOGIC (Yeh Add Karna Zaroori Hai)
  // =========================================================
  async markLessonComplete(
    lessonId: number,
    studentId: number,
  ): Promise<Progress> {
    // 1. Pehle progress find karo
    let progress = await this.lessonProgressRepository.findOne({
      where: {
        lesson: { id: lessonId },
        enrollment: { student: { id: studentId } },
      },
      relations: { enrollment: true, lesson: true },
    });

    if (progress) {
      progress.completedAt = new Date();
      return this.lessonProgressRepository.save(progress);
    }

    // 2. Agar Progress Record Exists Nahi Karta Toh Create Karo
    const enrollment = await this.enrollmentRepository.findOne({
      where: {
        student: { id: studentId },
        course: { lessons: { id: lessonId } },
      },
    });

    if (!enrollment) {
      throw new ForbiddenException(
        'You are not enrolled in the course for this lesson',
      );
    }

    const newProgress = this.lessonProgressRepository.create({
      completedAt: new Date(),
      lesson: { id: lessonId } as any,
      enrollment: { id: enrollment.id } as any,
    });

    return this.lessonProgressRepository.save(newProgress);
  }

  // =========================================================
  // ⚡ FIX: Quiz Answers Scoring Logic (Index Safe matching)
  // =========================================================
  async submitAttempt(
    quizId: number,
    studentId: number,
    dto: SubmitQuizDto,
  ): Promise<QuizAttempt> {
    const quiz = await this.findOne(quizId);

    const enrollment = await this.enrollmentRepository.findOne({
      where: { student: { id: studentId }, course: { id: quiz.course.id } },
    });
    if (!enrollment) {
      throw new ForbiddenException(
        'You must be enrolled in this course to attempt the quiz',
      );
    }

    if (dto.answers.length !== quiz.questions.length) {
      throw new BadRequestException(
        'Answer count does not match question count',
      );
    }

    // Direct Index ki jagah Safe Sorting ensure karein
    const sortedQuestions = quiz.questions.sort((a, b) => a.id - b.id);

    let score = 0;
    sortedQuestions.forEach((question, index) => {
      if (dto.answers[index] === question.correctAnswerIndex) {
        score++;
      }
    });

    const percentage = Math.round((score / sortedQuestions.length) * 100);
    const passed = percentage >= quiz.passingScore;

    const attempt = this.attemptRepository.create({
      score,
      totalQuestions: sortedQuestions.length,
      passed,
      enrollment: { id: enrollment.id } as any,
      quiz: { id: quizId } as any,
    });

    return this.attemptRepository.save(attempt);
  }

  // Student: quiz history for one quiz
  async getMyAttempts(
    quizId: number,
    studentId: number,
  ): Promise<QuizAttempt[]> {
    return this.attemptRepository.find({
      where: {
        quiz: { id: quizId },
        enrollment: { student: { id: studentId } },
      },
      order: { attemptedAt: 'DESC' },
    });
  }

  private checkQuizOwnership(quiz: Quiz, instructorId: number): void {
    if (quiz.course.instructor.id !== instructorId) {
      throw new ForbiddenException(
        'You can only modify quizzes in your own courses',
      );
    }
  }

  async remove(
    quizId: number,
    instructorId: number,
  ): Promise<{ message: string }> {
    const quiz = await this.findOne(quizId);
    this.checkQuizOwnership(quiz, instructorId);

    // Pehle attempts remove honge taake FK Constraint fail na ho
    await this.attemptRepository.delete({ quiz: { id: quizId } });
    await this.quizRepository.remove(quiz);

    return { message: 'Quiz deleted successfully' };
  }

  async getCourseQuizStats(
    courseId: number,
    instructorId: number,
  ): Promise<QuizAttempt[]> {
    const course = await this.coursesService.findOne(courseId);
    if (course.instructor.id !== instructorId) {
      throw new ForbiddenException(
        'You can only view stats for your own courses',
      );
    }

    return this.attemptRepository.find({
      where: { quiz: { course: { id: courseId } } },
      relations: {
        enrollment: { student: true },
        quiz: true,
      },
      order: { attemptedAt: 'ASC' },
    });
  }
}
