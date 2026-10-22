import React from 'react';
import { Link } from 'react-router-dom';
import { Sprout, ArrowLeft } from 'lucide-react';
import { Button } from '../../components/ui/Button';

export const NotFoundPage: React.FC = () => {
  return (
    <div className="py-24 px-4 text-center">
      <div className="w-16 h-16 rounded-full bg-[#E8EDEA] text-[#1E3A2F] flex items-center justify-center mx-auto mb-6">
        <Sprout className="w-8 h-8" />
      </div>
      <p className="text-xs font-semibold tracking-widest uppercase text-[#3A7D6A] mb-2">
        404 — Page Not Found
      </p>
      <h1 className="font-serif italic text-4xl text-[#1E3A2F] mb-4">
        This leaf hasn't sprouted yet.
      </h1>
      <p className="text-sm text-gray-600 max-w-md mx-auto mb-8">
        The botanical specimen or URL you are looking for has been moved or potted elsewhere.
      </p>
      <Link to="/">
        <Button variant="primary" size="md" icon={<ArrowLeft className="w-4 h-4" />}>
          Return to Nursery Home
        </Button>
      </Link>
    </div>
  );
};
