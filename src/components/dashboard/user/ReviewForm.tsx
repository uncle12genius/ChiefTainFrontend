import React, { useState } from 'react';
import { useAuth } from '../../../context/AuthContext';
import Button from '../../common/Button';

interface ReviewFormProps {
  productId: string;
  productName: string;
  onSubmit: (review: { rating: number; comment: string }) => void;
  onCancel: () => void;
}

const ReviewForm: React.FC<ReviewFormProps> = ({
  productId,
  productName,
  onSubmit,
  onCancel,
}) => {
  const { user } = useAuth();
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!comment.trim()) {
      alert('Please write a review comment');
      return;
    }

    setLoading(true);
    try {
      await onSubmit({ rating, comment: comment.trim() });
      setComment('');
      setRating(5);
    } catch (error) {
      console.error('Error submitting review:', error);
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return (
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 text-center">
        <p className="text-gray-600">Please sign in to write a review.</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <h3 className="text-lg font-medium text-gray-900 mb-4">
        Write a Review for {productName}
      </h3>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Rating */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Your Rating
          </label>
          <div className="flex space-x-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => setRating(star)}
                className="text-3xl focus:outline-none transition-transform hover:scale-110"
              >
                {star <= rating ? (
                  <span className="text-yellow-400">★</span>
                ) : (
                  <span className="text-gray-300">☆</span>
                )}
              </button>
            ))}
          </div>
          <p className="text-sm text-gray-500 mt-1">
            {rating === 5 ? 'Excellent' : 
             rating === 4 ? 'Good' : 
             rating === 3 ? 'Average' : 
             rating === 2 ? 'Poor' : 'Very Poor'}
          </p>
        </div>

        {/* Comment */}
        <div>
          <label htmlFor="comment" className="block text-sm font-medium text-gray-700 mb-2">
            Your Review
          </label>
          <textarea
            id="comment"
            rows={6}
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="input-field resize-none"
            placeholder="Share your experience with this product. What did you like? What could be improved?"
            required
          />
          <p className="text-sm text-gray-500 mt-1">
            {comment.length}/500 characters
          </p>
        </div>

        {/* Tips */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h4 className="text-sm font-medium text-blue-900 mb-2">Review Tips</h4>
          <ul className="text-sm text-blue-800 space-y-1">
            <li>• Mention the product quality and performance</li>
            <li>• Describe the installation process if applicable</li>
            <li>• Note any issues you encountered</li>
            <li>• Be honest and specific about your experience</li>
          </ul>
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-3 pt-4">
          <Button
            type="button"
            variant="outline"
            onClick={onCancel}
            className="flex-1"
          >
            Cancel
          </Button>
          <Button
            type="submit"
            loading={loading}
            className="flex-1"
          >
            Submit Review
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ReviewForm;