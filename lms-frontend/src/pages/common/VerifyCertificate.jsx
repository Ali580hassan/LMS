import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { api } from '../../api/client.js';
import { Card, Badge, Spinner, Alert, Button } from '../../components/ui.jsx';

export default function VerifyCertificate() {
    const { id } = useParams();
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        api
            .verifyCertificate(id)
            .then(setResult)
            .catch((err) => setError(err.message))
            .finally(() => setLoading(false));
    }, [id]);

    if (loading) {
        return (
            <div className="mx-auto flex min-h-[60vh] max-w-xl flex-col items-center justify-center gap-3 px-6 py-10 text-ink-700">
                <Spinner className="h-8 w-8 text-brand-500" />
                <p className="text-sm font-medium">Verifying certificate credentials...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="mx-auto max-w-xl px-6 py-12">
                <Alert>{error}</Alert>
            </div>
        );
    }

    const cert = result?.certificate;
    const issueDate = cert?.issuedAt
        ? new Date(cert.issuedAt).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        })
        : 'N/A';

    return (
        <div className="mx-auto max-w-2xl px-4 py-12 sm:px-6">
            <Card className="relative overflow-hidden border border-ink-900/10 p-6 shadow-xl sm:p-10">

                {/* Header Branding */}
                <div className="mb-8 flex flex-col items-center border-b border-ink-900/8 pb-6 text-center">
                    <Link to="/" className="mb-3 flex items-center gap-2">
                        <img
                            src="/logo-edu.png"
                            alt="EduVerse Logo"
                            className="h-10 w-10 object-contain"
                        />
                        <span className="font-display text-xl font-bold tracking-tight text-ink-900">
                            EduVerse LMS<span className="text-brand-500">.</span>
                        </span>
                    </Link>
                    <span className="text-xs font-semibold uppercase tracking-widest text-ink-500">
                        Official Verification Portal
                    </span>
                </div>

                {result?.valid ? (
                    <div className="flex flex-col items-center text-center">
                        {/* Success Icon Badge */}
                        <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/10 text-2xl text-emerald-600 ring-8 ring-emerald-500/5">
                            ✓
                        </div>

                        <Badge tone="success" className="px-3 py-1 text-xs uppercase tracking-wider">
                            Verified Authentic
                        </Badge>

                        <h1 className="mt-4 font-display text-2xl font-bold text-ink-900 sm:text-3xl">
                            {cert?.enrollment?.course?.title}
                        </h1>

                        <p className="mt-2 text-sm text-ink-700">
                            This document certifies that the course was successfully completed by
                        </p>

                        <div className="mt-3 rounded-xl bg-ink-900/5 px-6 py-2.5">
                            <span className="font-display text-lg font-semibold text-ink-900">
                                {cert?.enrollment?.student?.name}
                            </span>
                        </div>

                        {/* Credentials Details Grid */}
                        <div className="mt-8 grid w-full grid-cols-1 gap-4 rounded-2xl border border-ink-900/8 bg-paper/50 p-4 text-left sm:grid-cols-2">
                            <div>
                                <span className="block text-xs font-medium text-ink-500">Certificate ID</span>
                                <span className="font-mono text-sm font-semibold text-ink-900">#{cert?.id}</span>
                            </div>

                            <div>
                                <span className="block text-xs font-medium text-ink-500">Issued On</span>
                                <span className="text-sm font-semibold text-ink-900">{issueDate}</span>
                            </div>

                            <div>
                                <span className="block text-xs font-medium text-ink-500">Issuer</span>
                                <span className="text-sm font-semibold text-ink-900">EduVerse LMS</span>
                            </div>

                            <div>
                                <span className="block text-xs font-medium text-ink-500">Status</span>
                                <span className="text-sm font-semibold text-emerald-600">Active & Valid</span>
                            </div>
                        </div>

                        {/* Action Link */}
                        <div className="mt-8 w-full border-t border-ink-900/8 pt-6">
                            <Link to={`/certificates/${cert?.id}`}>
                                <Button variant="accent" className="w-full justify-center">
                                    View Full Certificate
                                </Button>
                            </Link>
                        </div>
                    </div>
                ) : (
                    <div className="flex flex-col items-center text-center">
                        {/* Error Icon Badge */}
                        <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-amber-500/10 text-2xl text-amber-600 ring-8 ring-amber-500/5">
                            ✕
                        </div>

                        <Badge tone="warning" className="px-3 py-1 text-xs uppercase tracking-wider">
                            Record Not Found
                        </Badge>

                        <h2 className="mt-4 font-display text-xl font-bold text-ink-900">
                            Invalid Certificate ID
                        </h2>

                        <p className="mt-2 max-w-md text-sm text-ink-700">
                            We could not locate any issued certificate matching the ID <span className="font-mono font-semibold text-ink-900">#{id}</span>. Please check the credential link or ID and try again.
                        </p>

                        <div className="mt-8 w-full border-t border-ink-900/8 pt-6">
                            <Link to="/">
                                <Button variant="outline" className="w-full justify-center">
                                    Back to Home
                                </Button>
                            </Link>
                        </div>
                    </div>
                )}
            </Card>
        </div>
    );
}