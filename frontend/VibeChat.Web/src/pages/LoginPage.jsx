import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useChat } from '../hooks/useChat';
import Button from '../components/Common/Button';
import Input from '../components/Common/Input';

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [error, setError] = useState('');
  const { handleLogin, loading } = useChat();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (username.trim().length < 3) {
      setError('Kullanıcı adı en az 3 karakter olmalıdır');
      return;
    }

    try {
      await handleLogin(username);
      navigate('/chat');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-app-text mb-2">
            VibeChat
          </h1>
          <span className="inline-block px-3 py-1 text-xs font-medium bg-app-primary text-white rounded-full">
            MVP
          </span>
          <p className="mt-4 text-app-text-secondary">
            AI destekli duygu analizi ile sohbet et
          </p>
        </div>

        <div className="bg-app-surface border border-app-border rounded-card p-6 shadow-card">
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              label="Kullanıcı Adı (Rumuz)"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="En az 3 karakter"
              error={error}
              disabled={loading}
              autoFocus
              required
            />

            <Button
              type="submit"
              variant="primary"
              disabled={loading || username.trim().length < 3}
              className="w-full"
            >
              {loading ? 'Giriş yapılıyor...' : 'Giriş Yap'}
            </Button>
          </form>

          <div className="mt-6 pt-6 border-t border-app-border">
            <p className="text-xs text-app-text-muted text-center">
              Giriş yaparak mesajlarınızın AI tarafından analiz edilmesini kabul etmiş olursunuz.
            </p>
          </div>
        </div>

        <div className="mt-6 text-center">
          <p className="text-sm text-app-text-secondary">
            FullStack + AI Stajyer Projesi
          </p>
        </div>
      </div>
    </div>
  );
}

