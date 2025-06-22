"use client";

import type React from "react";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import axios from "axios";

interface Review {
  _id: string;
  review: string;
  rating: number;
  faction: string;
  user: { _id: string; name: string }[];
  createdAt: Date;
}

// Mock data updated to match backend schema
const mockReviews = [
  {
    _id: "1",
    review: "This platform is amazing! The Force is strong with this one.",
    rating: 5,
    createdAt: new Date("2024-01-15"),
    user: "Luke Skywalker",
    faction: "jedi",
  },
  {
    _id: "2",
    review: "Impressive... most impressive. The dark side approves.",
    rating: 4,
    createdAt: new Date("2024-01-10"),
    user: "Darth Vader",
    faction: "sith",
  },
  {
    _id: "3",
    review: "This is where the fun begins! Excellent experience.",
    rating: 5,
    createdAt: new Date("2024-01-08"),
    user: "Anakin Skywalker",
    faction: "jedi",
  },
  {
    _id: "4",
    review: "I find your lack of features disturbing.",
    rating: 2,
    createdAt: new Date("2024-01-05"),
    user: "Imperial Officer",
    faction: "sith",
  },
  {
    _id: "5",
    review: "The interface is clunky and confusing. Not impressed.",
    rating: 1,
    createdAt: new Date("2024-01-03"),
    user: "Rebel Pilot",
    faction: "jedi",
  },
];

const RatingDisplay = ({
  rating,
  faction,
}: {
  rating: number;
  faction: string;
}) => {
  const renderRatingIcon = (index: number) => {
    const isActive = index < rating;

    if (rating <= 2) {
      // For bad ratings, use Death Star or Sith Lightning
      if (faction === "sith") {
        return (
          <span
            key={index}
            className={`text-lg ${isActive ? "text-red-500" : "text-gray-600"}`}
          >
            ⚡
          </span>
        );
      } else {
        return (
          <span
            key={index}
            className={`text-lg ${isActive ? "text-red-500" : "text-gray-600"}`}
          >
            💀
          </span>
        );
      }
    } else {
      // For good ratings, use lightsabers or stars
      if (faction === "sith") {
        return (
          <span
            key={index}
            className={`text-lg ${isActive ? "text-red-500" : "text-gray-600"}`}
          >
            ⚔️
          </span>
        );
      } else {
        return (
          <span
            key={index}
            className={`text-lg ${
              isActive ? "text-blue-500" : "text-gray-600"
            }`}
          >
            ⭐
          </span>
        );
      }
    }
  };

  return (
    <div className="flex space-x-1">
      {Array.from({ length: 5 }, (_, index) => renderRatingIcon(index))}
    </div>
  );
};

export default function Reviews() {
  const { user, isLoading } = useAuth();
  // const [reviews] = useState(mockReviews);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [hasUserReviewed, setHasUserReviewed] = useState(false);
  const [reviewsLoading, setReviewsLoading] = useState(true);
  const [newReview, setNewReview] = useState({
    review: "",
    rating: 5,
    faction: "jedi",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !user) {
      router.push("/login");
    }
  }, [user, isLoading, router]);

  useEffect(() => {
    if (!isLoading && user) {
      const fetchReviews = async () => {
        setReviewsLoading(true);
        try {
          const res = await axios.get(
            "https://chanu-wars-back.vercel.app/api/v1/reviews",
            {
              // const res = await axios.get("http://localhost:8000/api/v1/reviews", {
              withCredentials: true,
            }
          );
          setReviews(res.data.data.data);
          setHasUserReviewed(
            res.data.data.data.some((el: any) => el.user[0]._id === user?._id)
          );
          setReviewsLoading(false);
        } catch (error) {
          console.error("Failed to fetch reviews:", error);
          setReviewsLoading(false);
        }
      };
      fetchReviews();
    }
  }, [user, isLoading, isSubmitting]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const res = await axios.post(
        "https://chanu-wars-back.vercel.app/api/v1/reviews",
        // "http://localhost:8000/api/v1/reviews",
        { ...newReview },
        { withCredentials: true }
      );
      setNewReview(res.data.data.data);
      setIsSubmitting(false);
      router.push("/reviews");
    } catch (error) {
      console.error(error);
      setIsSubmitting(false);
    }
  };

  const formatDate = (date: string | Date) => {
    const d = new Date(date); // converts string to Date
    return d.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl font-bold text-white mb-2 font-mono tracking-wider">
            GALACTIC REVIEWS
          </h1>
          <p className="text-gray-400 font-mono">
            Share your experience across the galaxy
          </p>
          <Link
            href="/"
            className="inline-block mt-4 px-6 py-2 bg-cyan-600 hover:bg-cyan-500 text-white font-mono text-sm tracking-wider rounded transition-colors"
          >
            ← RETURN TO BASE
          </Link>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Reviews List */}
          <div className="lg:col-span-2 space-y-4">
            <h2 className="text-2xl font-bold text-cyan-400 mb-4 font-mono">
              TRANSMISSION LOG
            </h2>

            {reviewsLoading ? (
              <div className="flex items-center justify-center py-8">
                <div className="flex items-center space-x-3 text-cyan-400">
                  <div className="w-6 h-6 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin" />
                  <span className="font-mono">LOADING TRANSMISSIONS...</span>
                </div>
              </div>
            ) : reviews.length > 0 ? (
              reviews.map((review, index) => (
                <motion.div
                  key={review._id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`p-6 rounded-lg border backdrop-blur-sm ${
                    review.faction === "jedi"
                      ? "bg-blue-900/20 border-blue-500/30"
                      : "bg-red-900/20 border-red-500/30"
                  }`}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center ${
                          review.faction === "jedi"
                            ? "bg-blue-600"
                            : "bg-red-600"
                        }`}
                      >
                        <span className="text-white text-lg">
                          {review.faction === "jedi" ? "⚔️" : "⚡"}
                        </span>
                      </div>
                      <div>
                        <h3
                          className={`font-bold font-mono ${
                            review.faction === "jedi"
                              ? "text-blue-300"
                              : "text-red-300"
                          }`}
                        >
                          {review.user[0]?.name}
                        </h3>
                        <p className="text-gray-500 text-sm font-mono">
                          {formatDate(review.createdAt)}
                        </p>
                      </div>
                    </div>
                    <RatingDisplay
                      rating={review.rating}
                      faction={review.faction}
                    />
                  </div>

                  <p className="text-gray-300 font-mono leading-relaxed">
                    "{review.review}"
                  </p>
                </motion.div>
              ))
            ) : (
              <div className="text-center py-8 text-gray-400 font-mono">
                NO TRANSMISSIONS FOUND
              </div>
            )}
          </div>

          {/* Add Review Form */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className={`p-6 rounded-lg border backdrop-blur-sm sticky top-6 ${
                newReview.faction === "jedi"
                  ? "bg-blue-900/20 border-blue-500/30"
                  : "bg-red-900/20 border-red-500/30"
              }`}
            >
              <h2
                className={`text-xl font-bold mb-4 font-mono ${
                  newReview.faction === "jedi"
                    ? "text-cyan-400"
                    : "text-orange-400"
                }`}
              >
                NEW TRANSMISSION
              </h2>

              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Faction Selection */}
                <div>
                  <label
                    className={`block text-sm font-bold mb-2 font-mono ${
                      newReview.faction === "jedi"
                        ? "text-cyan-300"
                        : "text-orange-300"
                    }`}
                  >
                    ALLEGIANCE
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() =>
                        setNewReview({ ...newReview, faction: "jedi" })
                      }
                      className={`py-2 px-3 rounded border font-mono text-sm transition-all ${
                        newReview.faction === "jedi"
                          ? "border-blue-500 bg-blue-500/20 text-blue-300"
                          : "border-gray-600 bg-gray-800/50 text-gray-400"
                      }`}
                    >
                      ⚔️ JEDI
                    </button>
                    <button
                      type="button"
                      onClick={() =>
                        setNewReview({ ...newReview, faction: "sith" })
                      }
                      className={`py-2 px-3 rounded border font-mono text-sm transition-all ${
                        newReview.faction === "sith"
                          ? "border-red-500 bg-red-500/20 text-red-300"
                          : "border-gray-600 bg-gray-800/50 text-gray-400"
                      }`}
                    >
                      ⚡ SITH
                    </button>
                  </div>
                </div>

                {/* Rating */}
                <div>
                  <label
                    className={`block text-sm font-bold mb-2 font-mono ${
                      newReview.faction === "jedi"
                        ? "text-cyan-300"
                        : "text-orange-300"
                    }`}
                  >
                    RATING
                  </label>
                  <div className="flex space-x-2">
                    {Array.from({ length: 5 }, (_, index) => (
                      <button
                        key={index}
                        type="button"
                        onClick={() =>
                          setNewReview({ ...newReview, rating: index + 1 })
                        }
                        className={`text-2xl transition-all hover:scale-110 ${
                          index < newReview.rating
                            ? newReview.faction === "jedi"
                              ? "text-blue-500"
                              : "text-red-500"
                            : "text-gray-600"
                        }`}
                      >
                        {newReview.rating <= 2 && index < newReview.rating
                          ? newReview.faction === "sith"
                            ? "⚡"
                            : "💀"
                          : newReview.faction === "sith"
                          ? "⚔️"
                          : "⭐"}
                      </button>
                    ))}
                  </div>
                  <p className="text-xs text-gray-500 mt-1 font-mono">
                    {newReview.rating}/5 -{" "}
                    {newReview.rating === 5
                      ? "Excellent"
                      : newReview.rating === 4
                      ? "Good"
                      : newReview.rating === 3
                      ? "Average"
                      : newReview.rating === 2
                      ? "Poor"
                      : "Terrible"}
                  </p>
                </div>

                {/* Review Text */}
                <div>
                  <label
                    className={`block text-sm font-bold mb-2 font-mono ${
                      newReview.faction === "jedi"
                        ? "text-cyan-300"
                        : "text-orange-300"
                    }`}
                  >
                    MESSAGE
                  </label>
                  {!hasUserReviewed ? (
                    <textarea
                      value={newReview.review}
                      onChange={(e) =>
                        setNewReview({ ...newReview, review: e.target.value })
                      }
                      className={`w-full px-3 py-2 bg-black/70 border rounded text-white placeholder-gray-500 focus:outline-none transition-all font-mono text-sm resize-none ${
                        newReview.faction === "jedi"
                          ? "border-gray-600 focus:border-cyan-400"
                          : "border-gray-600 focus:border-orange-400"
                      }`}
                      rows={4}
                      placeholder="Share your experience..."
                      required
                    />
                  ) : (
                    <div className="p-4 rounded border border-yellow-500/30 bg-yellow-900/20">
                      <p className="text-yellow-300 font-mono text-sm text-center">
                        ⚠️ TRANSMISSION ALREADY SENT
                      </p>
                      <p className="text-yellow-400 font-mono text-xs text-center mt-1">
                        You have already submitted your review
                      </p>
                    </div>
                  )}
                </div>

                {/* Submit Button */}
                <motion.button
                  type="submit"
                  disabled={
                    isSubmitting || !newReview.review.trim() || hasUserReviewed
                  }
                  className={`w-full py-3 rounded font-mono font-bold text-sm tracking-wider transition-all ${
                    newReview.faction === "jedi"
                      ? "bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500"
                      : "bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-500 hover:to-orange-500"
                  } text-white disabled:opacity-50 disabled:cursor-not-allowed`}
                  whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {isSubmitting ? (
                    <div className="flex items-center justify-center space-x-2">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>TRANSMITTING...</span>
                    </div>
                  ) : (
                    `SEND TRANSMISSION`
                  )}
                </motion.button>
              </form>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
