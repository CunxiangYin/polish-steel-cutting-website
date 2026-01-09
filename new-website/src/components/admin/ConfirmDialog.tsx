interface ConfirmDialogProps {
  show: boolean;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm: () => void;
  onCancel: () => void;
  type?: 'danger' | 'warning' | 'info';
}

export default function ConfirmDialog({
  show,
  title,
  message,
  confirmText = 'n¤',
  cancelText = 'Öˆ',
  onConfirm,
  onCancel,
  type = 'warning'
}: ConfirmDialogProps) {
  if (!show) return null;

  const getTypeColors = () => {
    switch (type) {
      case 'danger':
        return {
          confirmBg: '#ef4444',
          confirmHover: '#dc2626',
          icon: ' '
        };
      case 'warning':
        return {
          confirmBg: '#f59e0b',
          confirmHover: '#d97706',
          icon: ' '
        };
      case 'info':
        return {
          confirmBg: '#3b82f6',
          confirmHover: '#2563eb',
          icon: '9'
        };
    }
  };

  const colors = getTypeColors();

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000,
      padding: '1rem'
    }}>
      <div style={{
        backgroundColor: 'white',
        padding: '2rem',
        borderRadius: '0.75rem',
        boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
        maxWidth: '400px',
        width: '100%',
        maxHeight: '90vh',
        overflow: 'auto'
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          marginBottom: '1rem',
          gap: '0.5rem'
        }}>
          <span style={{ fontSize: '1.5rem' }}>{colors.icon}</span>
          <h3 style={{ 
            margin: 0,
            color: '#111827',
            fontSize: '1.125rem',
            fontWeight: '600'
          }}>
            {title}
          </h3>
        </div>
        
        <p style={{ 
          marginBottom: '1.5rem',
          color: '#6b7280',
          lineHeight: '1.5',
          fontSize: '0.875rem'
        }}>
          {message}
        </p>
        
        <div style={{ 
          display: 'flex',
          gap: '0.75rem',
          justifyContent: 'flex-end',
          flexWrap: 'wrap'
        }}>
          <button
            onClick={onCancel}
            style={{
              padding: '0.625rem 1.25rem',
              backgroundColor: '#f3f4f6',
              color: '#374151',
              border: '1px solid #d1d5db',
              borderRadius: '0.5rem',
              cursor: 'pointer',
              fontSize: '0.875rem',
              fontWeight: '500',
              transition: 'all 0.2s'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#e5e7eb';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = '#f3f4f6';
            }}
          >
            {cancelText}
          </button>
          <button
            onClick={onConfirm}
            style={{
              padding: '0.625rem 1.25rem',
              backgroundColor: colors.confirmBg,
              color: 'white',
              border: 'none',
              borderRadius: '0.5rem',
              cursor: 'pointer',
              fontSize: '0.875rem',
              fontWeight: '500',
              transition: 'all 0.2s'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = colors.confirmHover;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = colors.confirmBg;
            }}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}