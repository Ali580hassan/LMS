import {
  Injectable,
  NotFoundException,
  ForbiddenException,
  Inject,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Certificate } from './entities/certificate.entity';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import type { Cache } from 'cache-manager';

@Injectable()
export class CertificatesService {
  constructor(
    @InjectRepository(Certificate)
    private certificateRepository: Repository<Certificate>,

    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  // Helper method: Cache invalidate karne ke liye
  private async clearStudentCertificatesCache(
    studentId?: number,
    certId?: number,
  ): Promise<void> {
    if (studentId) {
      await this.cacheManager.del(`student_certs_${studentId}`);
    }
    if (certId) {
      await this.cacheManager.del(`cert_verify_${certId}`);
      await this.cacheManager.del(`cert_details_${certId}`);
    }
  }

  // Automatic trigger — ProgressService is call karega jab progress 100% ho
  async createCertificate(enrollmentId: number): Promise<Certificate> {
    const existing = await this.certificateRepository.findOne({
      where: { enrollment: { id: enrollmentId } },
      relations: { enrollment: { student: true } },
    });

    if (existing) {
      return existing;
    }

    const certificate = this.certificateRepository.create({
      enrollment: { id: enrollmentId } as any,
    });

    const savedCertificate = await this.certificateRepository.save(certificate);

    // Relation fetch karke student.id nikalte hain taake cache clear ho sake
    const fullCert = await this.certificateRepository.findOne({
      where: { id: savedCertificate.id },
      relations: { enrollment: { student: true } },
    });

    // ⚡ CACHE INVALIDATION: Naya cert bante hi student ka cache clear kar do
    if (fullCert?.enrollment?.student?.id) {
      await this.clearStudentCertificatesCache(fullCert.enrollment.student.id);
    }

    return savedCertificate;
  }

  // Student: apne saare certificates dekho (WITH CACHING)
  async getMyCertificates(studentId: number): Promise<Certificate[]> {
    const cacheKey = `student_certs_${studentId}`;

    const cached = await this.cacheManager.get<Certificate[]>(cacheKey);
    if (cached) {
      console.log(`✅ CACHE HIT — ${cacheKey}`);
      return cached;
    }
    console.log(`❌ CACHE MISS — ${cacheKey}`);

    const certificates = await this.certificateRepository.find({
      where: { enrollment: { student: { id: studentId } } },
      relations: { enrollment: { course: true, student: true } },
      order: { issuedAt: 'DESC' },
    });

    // TTL in Seconds (1 Hour = 3600 sec)
    await this.cacheManager.set(cacheKey, certificates, 3600);
    return certificates;
  }

  // Instructor / Admin: Unke courses ke tamam issued certificates ki list dekho
  async getAllCertificates(instructorId?: number): Promise<Certificate[]> {
    return this.certificateRepository.find({
      where: instructorId
        ? { enrollment: { course: { instructor: { id: instructorId } } } }
        : {},
      relations: {
        enrollment: { course: true, student: true },
      },
      order: { issuedAt: 'DESC' },
    });
  }

  // Ek specific certificate dekho (download page ke liye) (WITH CACHING)
  async findOne(
    id: number,
    userId: number,
    role: string,
  ): Promise<Certificate> {
    const cacheKey = `cert_details_${id}`;

    let certificate = await this.cacheManager.get<Certificate>(cacheKey);

    if (!certificate) {
      console.log(`❌ CACHE MISS — ${cacheKey}`);
      certificate = (await this.certificateRepository.findOne({
        where: { id },
        relations: {
          enrollment: { course: { instructor: true }, student: true },
        },
      })) ?? undefined;

      if (!certificate) {
        throw new NotFoundException('Certificate not found');
      }

      await this.cacheManager.set(cacheKey, certificate, 86400); // 24 hours
    } else {
      console.log(`✅ CACHE HIT — ${cacheKey}`);
    }

    // Role-based security checks (Har request par re-verify karna zaroori hai)
    if (role === 'student' && certificate.enrollment?.student?.id !== userId) {
      throw new ForbiddenException('This is not your certificate');
    }

    if (
      role === 'instructor' &&
      certificate.enrollment?.course?.instructor?.id !== userId
    ) {
      throw new ForbiddenException(
        'You can only view certificates for your own courses',
      );
    }

    return certificate;
  }

  // Public verification — bina login ke authenticity check karein (WITH CACHING)
  async verify(
    id: number,
  ): Promise<{ valid: boolean; certificate?: Certificate }> {
    const cacheKey = `cert_verify_${id}`;

    const cached = await this.cacheManager.get<{
      valid: boolean;
      certificate?: Certificate;
    }>(cacheKey);

    if (cached) {
      console.log(`✅ CACHE HIT — ${cacheKey}`);
      return cached;
    }
    console.log(`❌ CACHE MISS — ${cacheKey}`);

    const certificate = await this.certificateRepository.findOne({
      where: { id },
      relations: { enrollment: { course: true, student: true } },
    });

    if (!certificate) {
      const invalidResult = { valid: false };
      await this.cacheManager.set(cacheKey, invalidResult, 300); // Invalid cert 5 mins cache
      return invalidResult;
    }

    const validResult = { valid: true, certificate };
    await this.cacheManager.set(cacheKey, validResult, 86400); // Valid cert 24 hrs cache
    return validResult;
  }
}
