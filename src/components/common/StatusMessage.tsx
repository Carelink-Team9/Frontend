interface StatusMessageProps {
  message: string;
  tone?: 'default' | 'error';
  className?: string;
}

const toneClassMap = {
  default: 'text-[#6b7280]',
  error: 'text-[#ef4444]',
};

export default function StatusMessage({
  message,
  tone = 'default',
  className = '',
}: StatusMessageProps) {
  return (
    <div className={`py-[40px] text-center text-[15px] font-medium ${toneClassMap[tone]} ${className}`}>
      {message}
    </div>
  );
}
