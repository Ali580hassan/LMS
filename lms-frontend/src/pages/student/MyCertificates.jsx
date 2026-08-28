import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext.jsx';
import { api } from '../../api/client.js';
import { Card, Badge, Spinner, Alert, Button } from '../../components/ui.jsx';

export default function MyCertificates() {
    const { token } = useAuth();
    const [certificates, setCertificates] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        api
            .getMyCertificates(token)
            .then(setCertificates)
            .catch((err) => setError(err.message))
            .finally(() => setLoading(false));
    }, [token]);

    return (
        <div className="mx-auto max-w-3xl px-6 py-10">
            <h1 className="font-display mb-1 text-2xl font-semibold text-ink-900">My Certificates</h1>
            <p className="mb-6 text-sm text-ink-700">
                Earned automatically when you complete 100% of a course.
            </p>

            {loading && (
                <div className="flex items-center gap-2 text-ink-700">
                    <Spinner /> Loading…
                </div>
            )}
            {error && <Alert>{error}</Alert>}

            {!loading && certificates.length === 0 && (
                <Card className="p-8 text-center text-sm text-ink-700">
                    No certificates yet — finish a course to earn one.
                </Card>
            )}

            <div className="flex flex-col gap-3">
                {certificates.map((cert) => (
                    <Card key={cert.id} className="flex items-center justify-between gap-3 p-5">
                        <div>
                            <h3 className="text-sm font-semibold text-ink-900">
                                {cert.enrollment?.course?.title}
                            </h3>
                            <p className="text-xs text-ink-600">
                                Issued {new Date(cert.issuedAt).toLocaleDateString()}
                            </p>
                        </div>
                        <div className="flex items-center gap-2">
                            <Badge tone="success">Certified</Badge>
                            <Link to={`/certificates/${cert.id}`}>
                                <Button variant="outline" className="text-xs">
                                    View
                                </Button>
                            </Link>
                        </div>
                    </Card>
                ))}
            </div>
        </div>
    );
}