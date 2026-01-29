export default function AdminLayout({ children }) {
    return (
        <div className="admin-layout" style={{
            minHeight: '100vh',
            backgroundColor: 'var(--color-bg)',
            color: 'var(--color-text-primary)',
            fontFamily: 'var(--font-family)'
        }}>
            {children}
        </div>
    );
}
