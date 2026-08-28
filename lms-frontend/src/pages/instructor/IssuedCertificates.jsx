import { useEffect, useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext.jsx';
import { api } from '../../api/client.js';
import { Card, Badge, Spinner, Alert, Button } from '../../components/ui.jsx';

export default function IssuedCertificates() {
    const { token } = useAuth();
    const [certificates, setCertificates] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [searchQuery, setSearchQuery] = useState('');

    // Sorting State: key defines which column to sort by, direction is 'asc' or 'desc'
    const [sortConfig, setSortConfig] = useState({
        key: 'student',
        direction: 'asc',
    });

    useEffect(() => {
        if (!token) {
            setLoading(false);
            return;
        }

        setLoading(true);
        setError('');

        api
            .getAllCertificates(token)
            .then((data) => setCertificates(data))
            .catch((err) => setError(err.message || 'Failed to fetch certificates.'))
            .finally(() => setLoading(false));
    }, [token]);

    // Handler to switch sort direction or column
    const handleSort = (key) => {
        let direction = 'asc';
        if (sortConfig.key === key && sortConfig.direction === 'asc') {
            direction = 'desc';
        }
        setSortConfig({ key, direction });
    };

    // Helper to render the sorting indicator arrow
    const renderSortIcon = (key) => {
        if (sortConfig.key !== key) {
            return <span className="ml-1 text-ink-300">↕</span>;
        }
        return sortConfig.direction === 'asc' ? (
            <span className="ml-1 text-brand-600">↑</span>
        ) : (
            <span className="ml-1 text-brand-600">↓</span>
        );
    };

    // Filter and Sort certificates based on search query and active sort column
    const processedCertificates = useMemo(() => {
        // 1. Filter
        const filtered = certificates.filter((cert) => {
            const studentName = cert.enrollment?.student?.name?.toLowerCase() || '';
            const courseTitle = cert.enrollment?.course?.title?.toLowerCase() || '';
            const query = searchQuery.toLowerCase();
            return studentName.includes(query) || courseTitle.includes(query);
        });

        // 2. Sort
        return [...filtered].sort((a, b) => {
            let valueA = '';
            let valueB = '';

            switch (sortConfig.key) {
                case 'student':
                    valueA = a.enrollment?.student?.name || '';
                    valueB = b.enrollment?.student?.name || '';
                    break;
                case 'course':
                    valueA = a.enrollment?.course?.title || '';
                    valueB = b.enrollment?.course?.title || '';
                    break;
                case 'issueDate':
                    valueA = a.issuedAt ? new Date(a.issuedAt).getTime() : 0;
                    valueB = b.issuedAt ? new Date(b.issuedAt).getTime() : 0;
                    break;
                case 'id':
                    valueA = a.id;
                    valueB = b.id;
                    break;
                default:
                    return 0;
            }

            if (valueA < valueB) {
                return sortConfig.direction === 'asc' ? -1 : 1;
            }
            if (valueA > valueB) {
                return sortConfig.direction === 'asc' ? 1 : -1;
            }
            return 0;
        });
    }, [certificates, searchQuery, sortConfig]);

    if (!token) {
        return (
            <div className="mx-auto max-w-md px-6 py-16 text-center">
                <Alert tone="warning">
                    Session expired or not logged in. Please log in again to view issued certificates.
                </Alert>
                <Link to="/login" className="mt-4 inline-block font-medium text-brand-600 underline">
                    Go to Login Page
                </Link>
            </div>
        );
    }

    if (loading) {
        return (
            <div className="mx-auto flex min-h-[50vh] max-w-5xl items-center justify-center gap-2 px-6 py-12 text-ink-700">
                <Spinner className="h-7 w-7 text-brand-500" />
                <p className="text-sm font-medium">Loading issued certificates...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="mx-auto max-w-5xl px-6 py-10">
                <Alert>{error}</Alert>
            </div>
        );
    }

    return (
        <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
            {/* Header Section */}
            <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <h1 className="font-display text-2xl font-bold tracking-tight text-ink-900 sm:text-3xl">
                        Issued Certificates
                    </h1>
                    <p className="mt-1 text-sm text-ink-600">
                        View all students who have completed your courses and earned a certificate.
                    </p>
                </div>
                <div className="flex items-center gap-2">
                    <Badge tone="success" className="px-3 py-1.5 text-xs font-semibold">
                        Total Issued: {certificates.length}
                    </Badge>
                </div>
            </div>

            {/* Search Filter Bar */}
            <div className="mb-6">
                <input
                    type="text"
                    placeholder="Search by student name or course title..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full max-w-md rounded-xl border border-ink-900/15 bg-white px-4 py-2.5 text-sm text-ink-900 shadow-sm transition placeholder:text-ink-400 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20"
                />
            </div>

            {/* Certificates Table */}
            {processedCertificates.length === 0 ? (
                <Card className="p-12 text-center">
                    <p className="text-base font-medium text-ink-800">
                        {searchQuery ? 'No certificates match your search.' : 'No certificates issued yet.'}
                    </p>
                    <p className="mt-1 text-sm text-ink-500">
                        When students complete 100% of your course requirements, their certificates will appear here.
                    </p>
                </Card>
            ) : (
                <div className="overflow-hidden rounded-2xl border border-ink-900/10 bg-white shadow-sm">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-sm text-ink-700">
                            <thead className="border-b border-ink-900/10 bg-paper/60 text-xs font-semibold uppercase tracking-wider text-ink-500">
                                <tr>
                                    <th
                                        className="cursor-pointer px-6 py-4 transition hover:bg-ink-900/5 select-none"
                                        onClick={() => handleSort('student')}
                                    >
                                        <div className="flex items-center gap-1">
                                            Student {renderSortIcon('student')}
                                        </div>
                                    </th>
                                    <th
                                        className="cursor-pointer px-6 py-4 transition hover:bg-ink-900/5 select-none"
                                        onClick={() => handleSort('course')}
                                    >
                                        <div className="flex items-center gap-1">
                                            Course {renderSortIcon('course')}
                                        </div>
                                    </th>
                                    <th
                                        className="cursor-pointer px-6 py-4 transition hover:bg-ink-900/5 select-none"
                                        onClick={() => handleSort('issueDate')}
                                    >
                                        <div className="flex items-center gap-1">
                                            Issue Date {renderSortIcon('issueDate')}
                                        </div>
                                    </th>
                                    <th
                                        className="cursor-pointer px-6 py-4 transition hover:bg-ink-900/5 select-none"
                                        onClick={() => handleSort('id')}
                                    >
                                        <div className="flex items-center gap-1">
                                            Certificate ID {renderSortIcon('id')}
                                        </div>
                                    </th>
                                    <th className="px-6 py-4 text-right">Action</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-ink-900/5">
                                {processedCertificates.map((cert) => {
                                    const student = cert.enrollment?.student;
                                    const course = cert.enrollment?.course;
                                    const issueDate = cert.issuedAt
                                        ? new Date(cert.issuedAt).toLocaleDateString('en-US', {
                                            year: 'numeric',
                                            month: 'short',
                                            day: 'numeric',
                                        })
                                        : 'N/A';

                                    return (
                                        <tr key={cert.id} className="hover:bg-ink-900/[0.02] transition">
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-3">
                                                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-500/10 font-bold text-brand-600">
                                                        {student?.name?.charAt(0) || 'S'}
                                                    </div>
                                                    <div>
                                                        <p className="font-semibold text-ink-900">
                                                            {student?.name || 'Unknown Student'}
                                                        </p>
                                                        <p className="text-xs text-ink-500">
                                                            {student?.email || ''}
                                                        </p>
                                                    </div>
                                                </div>
                                            </td>

                                            <td className="px-6 py-4 font-medium text-ink-900">
                                                {course?.title || 'Course'}
                                            </td>

                                            <td className="px-6 py-4 whitespace-nowrap text-ink-600">
                                                {issueDate}
                                            </td>

                                            <td className="px-6 py-4 font-mono text-xs font-semibold text-ink-500 whitespace-nowrap">
                                                #{cert.id}
                                            </td>

                                            <td className="px-6 py-4 text-right whitespace-nowrap">
                                                <Link to={`/verify/${cert.id}`}>
                                                    <Button variant="outline" className="px-3 py-1.5 text-xs">
                                                        Verify Credential
                                                    </Button>
                                                </Link>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </div>
    );
}