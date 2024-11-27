'use client';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en">
      <body>
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '100vh',
          padding: '1rem',
          textAlign: 'center',
          fontFamily: 'system-ui, -apple-system, sans-serif'
        }}>
          <div style={{
            maxWidth: '42rem',
            width: '100%'
          }}>
            <h1 style={{
              fontSize: '2rem',
              fontWeight: 'bold',
              marginBottom: '1rem'
            }}>
              Something went wrong!
            </h1>
            <p style={{
              fontSize: '1rem',
              color: '#666',
              marginBottom: '1.5rem'
            }}>
              {error.message || "An unexpected error occurred"}
            </p>
            {error.digest && (
              <p style={{
                fontSize: '0.875rem',
                color: '#666',
                marginBottom: '1rem'
              }}>
                Error ID: {error.digest}
              </p>
            )}
            <button
              onClick={() => reset()}
              style={{
                backgroundColor: '#000',
                color: '#fff',
                border: 'none',
                padding: '0.75rem 1.5rem',
                borderRadius: '0.375rem',
                fontSize: '1rem',
                cursor: 'pointer',
                width: '100%'
              }}
            >
              Try again
            </button>
          </div>
        </div>
      </body>
    </html>
  );
}