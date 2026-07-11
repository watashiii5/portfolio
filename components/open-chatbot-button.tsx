'use client';

export function OpenChatbotButton() {
  return (
    <button
      className="button"
      onClick={() => window.dispatchEvent(new Event('open-chatbot'))}
    >
      Open chatbot
    </button>
  );
}
