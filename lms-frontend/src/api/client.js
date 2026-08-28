import axios from 'axios';

const BASE_URL = 'http://localhost:3000/api';

async function request(path, { method = 'GET', body, token } = {}) {
  const headers = { 'Content-Type': 'application/json' };
  if (token) headers.Authorization = `Bearer ${token}`;

  try {
    const response = await axios({
      url: `${BASE_URL}${path}`,
      method,
      headers,
      data: body,
    });

    return response.data;
  } catch (error) {
    const status = error.response?.status;
    const data = error.response?.data;

    const isAuthRoute = path.startsWith('/auth/login') || path.startsWith('/auth/register');

    // 1. Session Expiry Check (401)
    if (status === 401 && !isAuthRoute) {
      localStorage.removeItem('lms_token');
      window.location.href = '/login';
      throw new Error('Session expired. Please log in again.');
    }

    // 2. 🛑 Rate Limit Check (429 Too Many Requests)
    if (status === 429) {
      const retryAfterSeconds = error.response?.headers?.['retry-after'] || 60;

      const err = new Error(
        `Too many attempts. Please try again after ${retryAfterSeconds} seconds.`
      );
      err.retryAfter = parseInt(retryAfterSeconds, 10); // Components mein countdown ke liye
      err.status = 429;
      throw err;
    }

    // 3. General Error Message
    const message = data?.message || error.message || 'Something went wrong';
    throw new Error(Array.isArray(message) ? message.join(', ') : message);
  }
}
export const api = {
  // Auth
  register: (dto) => request('/auth/register', { method: 'POST', body: dto }),
  login: (dto) => request('/auth/login', { method: 'POST', body: dto }),

  // Notifications
  getNotifications: (token) => request('/notifications/my', { token }),
  markNotificationRead: (id, token) =>
    request(`/notifications/${id}/read`, { method: 'PATCH', token }),
  deleteNotification: (id, token) =>
    request(`/notifications/${id}`, { method: 'DELETE', token }),
  // Courses
  getCourses: (page = 1, limit = 10, search = '', categoryId = null) =>
    request(
      `/courses?page=${page}&limit=${limit}&search=${encodeURIComponent(search)}${categoryId ? `&categoryId=${categoryId}` : ''
      }`
    ),
  getCourse: (id) => request(`/courses/${id}`),
  createCourse: (dto, token) => request('/courses', { method: 'POST', body: dto, token }),
  updateCourse: (id, dto, token) => request(`/courses/${id}`, { method: 'PATCH', body: dto, token }),
  deleteCourse: (id, token) => request(`/courses/${id}`, { method: 'DELETE', token }),
  togglePublish: (id, token) => request(`/courses/${id}/publish`, { method: 'PATCH', token }),

  // Instructor Specific Method
  getInstructorCourses: (token) => request('/courses/instructor', { token }),

  // Lessons
  createLesson: (courseId, dto, token) =>
    request(`/courses/${courseId}/lessons`, { method: 'POST', body: dto, token }),
  getLesson: (courseId, token) =>
    request(`/courses/${courseId}/lessons`, { token }),
  getLessonsPaginated: (courseId, page = 1, limit = 3, token) =>
    request(`/courses/${courseId}/lessons?page=${page}&limit=${limit}`, { token }),
  getMe: (token) => request('/users/me', { token }),
  updateLesson: (courseId, lessonId, dto, token) =>
    request(`/courses/${courseId}/lessons/${lessonId}`, { method: 'PATCH', body: dto, token }),
  deleteLesson: (courseId, lessonId, token) =>
    request(`/courses/${courseId}/lessons/${lessonId}`, { method: 'DELETE', token }),

  // Categories
  getCategories: () => request('/categories'),
  createCategory: (dto, token) => request('/categories', { method: 'POST', body: dto, token }),
  updateCategory: (id, dto, token) => request(`/categories/${id}`, { method: 'PATCH', body: dto, token }),
  deleteCategory: (id, token) => request(`/categories/${id}`, { method: 'DELETE', token }),
  assignCategories: (courseId, categoryIds, token) =>
    request(`/courses/${courseId}/categories`, { method: 'PATCH', body: { categoryIds }, token }),

  // Enrollments
  enroll: (courseId, token) => request('/enrollments', { method: 'POST', body: { courseId }, token }),
  cancelEnrollment: (courseId, token) => request(`/enrollments/${courseId}`, { method: 'DELETE', token }),
  getMyEnrollments: (token) => request('/enrollments/my', { token }),
  getCourseStudents: (courseId, token) => request(`/enrollments/course/${courseId}`, { token }),

  // Progress
  markLessonComplete: (lessonId, token) => request(`/progress/${lessonId}/complete`, { method: 'POST', token }),

  // Quizzes
  createQuiz: (courseId, dto, token) =>
    request(`/courses/${courseId}/quizzes`, { method: 'POST', body: dto, token }),
  getQuizzes: (courseId, token) =>
    request(`/courses/${courseId}/quizzes`, { token }),
  submitQuiz: (courseId, quizId, answers, token) =>
    request(`/courses/${courseId}/quizzes/${quizId}/submit`, { method: 'POST', body: { answers }, token }),
  getMyQuizAttempts: (courseId, quizId, token) =>
    request(`/courses/${courseId}/quizzes/${quizId}/my-attempts`, { token }),
  deleteQuiz: (courseId, quizId, token) =>
    request(`/courses/${courseId}/quizzes/${quizId}`, { method: 'DELETE', token }),
  getCourseQuizStats: (courseId, token) =>
    request(`/courses/${courseId}/quizzes/stats`, { token }),

  // Assignments
  getAssignments: (courseId, token) =>
    request(`/courses/${courseId}/assignments`, { token }),
  getAssignment: (courseId, assignmentId, token) =>
    request(`/courses/${courseId}/assignments/${assignmentId}`, { token }),
  createAssignment: (courseId, dto, token) =>
    request(`/courses/${courseId}/assignments`, { method: 'POST', body: dto, token }),
  updateAssignment: (courseId, assignmentId, dto, token) =>
    request(`/courses/${courseId}/assignments/${assignmentId}`, { method: 'PATCH', body: dto, token }),
  deleteAssignment: (courseId, assignmentId, token) =>
    request(`/courses/${courseId}/assignments/${assignmentId}`, { method: 'DELETE', token }),

  submitAssignment: (courseId, assignmentId, dto, token) =>
    request(`/courses/${courseId}/assignments/${assignmentId}/submit`, { method: 'POST', body: dto, token }),
  getMySubmission: (courseId, assignmentId, token) =>
    request(`/courses/${courseId}/assignments/${assignmentId}/my-submission`, { token }),

  getSubmissions: (courseId, assignmentId, token) =>
    request(`/courses/${courseId}/assignments/${assignmentId}/submissions`, { token }),

  gradeSubmission: (courseId, submissionId, gradeData, token) =>
    request(`/courses/${courseId}/assignments/submissions/${submissionId}/grade`, {
      method: 'PATCH',
      body: gradeData,
      token,
    }),

  // Reviews
  getReviews: (courseId, token) =>
    request(`/courses/${courseId}/reviews`, { token }),
  getAverageRating: (courseId, token) =>
    request(`/courses/${courseId}/reviews/average`, { token }),
  createReview: (courseId, dto, token) =>
    request(`/courses/${courseId}/reviews`, { method: 'POST', body: dto, token }),
  updateReview: (courseId, reviewId, data, token) =>
    request(`/courses/${courseId}/reviews/${reviewId}`, {
      method: 'PATCH',
      body: data,
      token,
    }),
  deleteReview: (courseId, reviewId, token) =>
    request(`/courses/${courseId}/reviews/${reviewId}`, {
      method: 'DELETE',
      token,
    }),

  // Certificates
  getMyCertificates: (token) => request('/certificates/my', { token }),
  getCertificate: (id, token) => request(`/certificates/${id}`, { token }),
  verifyCertificate: (id) => request(`/certificates/${id}/verify`),
  getAllCertificates: (token) => request('/certificates/all', { token }),

  // File Upload
  uploadFile: async (file, token) => {
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await axios.post(`${BASE_URL}/upload`, formData, {
        headers: { Authorization: `Bearer ${token}` },
      });

      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || error.message || 'Upload failed');
    }
  },
};