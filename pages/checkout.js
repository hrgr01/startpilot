// pages/checkout.js
import { useRouter } from 'next/router';
import { useEffect } from 'react';

export default function Checkout() {
  const router = useRouter();

  useEffect(() => {
    // Direkt till Stripe Checkout
    fetch('/api/stripe-session', {
      method: 'POST',
    })
      .then(res => res.json())
      .then(data => {
        if (data.url) {
          window.location.href = data.url;
        }
      });
  }, []);

  return (
    <div className="flex h-screen items-center justify-center text-center text-lg">
      Omdirigerar till betalning via Stripe...
    </div>
  );
}
