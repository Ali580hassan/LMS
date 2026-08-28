import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext.jsx';
import { api } from '../../api/client.js';
import { Spinner, Alert, Button } from '../../components/ui.jsx';

export default function CertificateView() {
    const { id } = useParams();
    const { token } = useAuth();
    const [certificate, setCertificate] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        api
            .getCertificate(id, token)
            .then(setCertificate)
            .catch((err) => setError(err.message))
            .finally(() => setLoading(false));
    }, [id, token]);

    if (loading) {
        return (
            <div className="mx-auto flex max-w-2xl items-center justify-center gap-2 px-6 py-20 text-ink-700">
                <Spinner /> Loading certificate…
            </div>
        );
    }

    if (error) {
        return (
            <div className="mx-auto max-w-2xl px-6 py-10">
                <Alert>{error}</Alert>
            </div>
        );
    }

    const studentName = certificate?.enrollment?.student?.name || 'Student Name';
    const courseTitle = certificate?.enrollment?.course?.title || 'Course Title';
    const issueDate = certificate?.issuedAt
        ? new Date(certificate.issuedAt).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        })
        : '';

    return (
        <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6">
            {/* CSS Print Styles */}
            <style>
                {`
                    @media print {
                        body {
                            background: white !important;
                        }
                        .no-print {
                            display: none !important;
                        }
                        .print-container {
                            border: 8px double #1e293b !important;
                            box-shadow: none !important;
                            margin: 0 !important;
                            width: 100% !important;
                            max-width: 100% !important;
                        }
                    }
                `}
            </style>

            {/* Certificate Outer Card */}
            <div className="print-container relative overflow-hidden rounded-2xl border-[10px] border-double border-ink-900 bg-white p-8 sm:p-14 shadow-2xl">

                {/* Background Watermark */}
                <div className="pointer-events-none absolute -right-10 -bottom-10 opacity-5">
                    <img src="/logo-edu.png" alt="" className="h-96 w-96 object-contain" />
                </div>

                {/* Header Section with Logo */}
                <div className="flex flex-col items-center text-center">
                    <div className="flex items-center gap-3">
                        <img
                            src="/logo-edu.png"
                            alt="EduVerse Logo"
                            className="h-14 w-14 sm:h-16 sm:w-16 object-contain"
                        />
                        <span className="font-display text-2xl font-bold tracking-tight text-ink-900 sm:text-3xl">
                            EduVerse LMS<span className="text-brand-500">.</span>
                        </span>
                    </div>

                    <div className="mt-6 h-0.5 w-24 bg-brand-500/40"></div>

                    <span className="mt-6 text-xs font-bold uppercase tracking-[0.25em] text-brand-600 sm:text-sm">
                        Certificate of Excellence
                    </span>
                </div>

                {/* Main Content */}
                <div className="mt-8 text-center">
                    <p className="text-sm italic text-ink-600 sm:text-base">
                        This is to certify that
                    </p>

                    <h2 className="mt-3 font-display text-3xl font-bold tracking-wide text-ink-900 sm:text-4xl underline decoration-brand-500/30 underline-offset-8">
                        {studentName}
                    </h2>

                    <p className="mt-6 text-sm leading-relaxed text-ink-700 sm:text-base">
                        has demonstrated exceptional dedication and successfully completed all required lectures, quizzes, and practical assessments for the online course:
                    </p>

                    <h1 className="mt-3 text-xl font-bold text-brand-600 sm:text-2xl">
                        "{courseTitle}"
                    </h1>

                    {/* Achievement Metrics Pill */}
                    <div className="mt-6 inline-flex flex-wrap items-center justify-center gap-4 rounded-full border border-ink-900/10 bg-ink-900/[0.02] px-6 py-2 text-xs font-medium text-ink-700">
                        <span>✓ Quizzes Passed</span>
                        <span className="text-ink-300">•</span>
                        <span>✓ Coursework Completed</span>
                        <span className="text-ink-300">•</span>
                        <span>✓ Verified Effort</span>
                    </div>
                </div>

                {/* Footer Meta & Signatures */}
                <div className="mt-12 grid grid-cols-1 gap-6 border-t border-ink-900/10 pt-8 sm:grid-cols-3 sm:items-end">

                    {/* Date & ID */}
                    <div className="text-center sm:text-left">
                        <p className="text-xs font-semibold text-ink-900">
                            Issued On: <span className="font-normal text-ink-700">{issueDate}</span>
                        </p>
                        <p className="mt-1 text-[11px] font-mono text-ink-500">
                            ID: {certificate?.id}
                        </p>
                    </div>

                    {/* Official Stamp / Badge */}
                    <div className="flex justify-center">
                        <div className="flex h-16 w-16 items-center justify-center rounded-full border-2 border-brand-500/40 bg-brand-500/10 text-center">
                            <span className="text-[10px] font-bold uppercase tracking-wider text-brand-600">
                                Official<br />Verified
                            </span>
                        </div>
                    </div>

                    {/* Signature Space */}
                    <div className="text-center sm:text-right">
                        <div className="mx-auto sm:ml-auto sm:mr-0 h-10 w-36 border-b border-ink-900/40 flex items-end justify-center pb-1">
                            <span className="font-serif italic text-lg font-semibold text-ink-900">Ali Hassan</span>
                        </div>
                        <p className="mt-1 text-xs font-semibold text-ink-900">Authorized Signature</p>
                    </div>
                </div>
            </div>

            {/* Action Buttons */}
            <div className="no-print mt-6 flex flex-wrap items-center justify-center gap-3">
                <Button variant="accent" onClick={() => window.print()}>
                    Print / Save as PDF
                </Button>

                <Link
                    to={`/verify/${certificate?.id}`}
                    className="inline-flex items-center rounded-xl border border-ink-900/15 bg-white px-4 py-2.5 text-sm font-medium text-ink-900 hover:bg-ink-900/5 transition shadow-sm"
                >
                    Verify Authenticity
                </Link>
            </div>
        </div>
    );
}