import { Link } from 'react-router-dom';

function AllArticles() {
  const posts = [
    {
      id: 1,
      title: 'The Power of Positive Thinking',
      category: 'Mind',
      date: 'July 1, 2025',
      instructor: 'Dr. Anjali Sharma',
      image: '/blog-1.jpg',
      excerpt: 'Discover how positive thinking can transform your life and improve your overall well-being.',
      tags: ['Mindfulness', 'Wellness', 'Self-Improvement']
    },
    {
      id: 2,
      title: 'Yoga for Better Sleep',
      category: 'Body',
      date: 'June 25, 2025',
      instructor: 'Yogi Raj',
      image: '/blog-2.jpg',
      excerpt: 'Learn yoga poses and techniques to help you get a better night\'s sleep.',
      tags: ['Yoga', 'Sleep', 'Wellness']
    },
    {
      id: 3,
      title: 'Understanding Chakras',
      category: 'Soul',
      date: 'June 20, 2025',
      instructor: 'Priya Patel',
      image: '/blog-3.jpg',
      excerpt: 'A comprehensive guide to the seven major chakras and their significance.',
      tags: ['Soul', 'Energy', 'Healing']
    },
    {
      id: 4,
      title: 'Stress Management Techniques',
      category: 'Mind',
      date: 'June 15, 2025',
      instructor: 'Dr. Anjali Sharma',
      image: '/blog-4.jpg',
      excerpt: 'Effective strategies to manage and reduce stress in your daily life.',
      tags: ['Mindfulness', 'Stress', 'Wellness']
    },
    {
      id: 5,
      title: 'Nutrition for Wellness',
      category: 'Body',
      date: 'June 10, 2025',
      instructor: 'Neha Verma',
      image: '/blog-5.jpg',
      excerpt: 'How proper nutrition can support your wellness journey.',
      tags: ['Nutrition', 'Wellness', 'Health']
    }
  ];

  return (
    <div className="min-h-screen w-full bg-background">
      <div className="max-w-4xl mx-auto py-16 px-4">
        <h1 className="text-4xl font-bold text-indigo-800 text-center mb-12">All Articles</h1>
        
        <div className="space-y-8">
          {/* Introduction */}
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-indigo-800 mb-4">Explore Our Articles</h2>
            <p className="text-gray-700 text-lg">
              Discover our collection of wellness articles across Mind, Body, and Soul categories.
            </p>
          </div>

          {/* Articles Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post) => (
              <div 
                key={post.id}
                className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300"
              >
                <div className="relative h-48 bg-gray-100">
                  {/* Placeholder for image */}
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-100 via-pink-100 to-blue-100"></div>
                </div>
                <div className="p-6">
                  <span className="inline-block px-3 py-1 rounded-full bg-indigo-100 text-indigo-700 text-sm font-medium mb-2">
                    {post.category}
                  </span>
                  <h3 className="text-xl font-bold text-indigo-800 mb-2">{post.title}</h3>
                  <p className="text-gray-600 mb-4">{post.excerpt}</p>
                  <div className="flex justify-between items-center text-sm text-gray-500">
                    <span>{post.date}</span>
                    <span>{post.instructor}</span>
                  </div>
                  <div className="mt-4 flex gap-2">
                    {post.tags.map((tag) => (
                      <span 
                        key={tag}
                        className="px-2 py-1 text-xs rounded-full bg-indigo-100 text-indigo-700"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <Link 
                    to={`/blog/${post.id}`}
                    className="mt-4 w-full bg-gradient-to-r from-purple-100 via-purple-200 to-blue-100 text-indigo-700 font-semibold py-2 px-4 rounded-full shadow hover:shadow-lg transition-all duration-200"
                  >
                    Read More
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {/* Categories Filter */}
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-indigo-800 mb-6">Filter by Category</h2>
            <div className="flex gap-4 flex-wrap">
              <button className="px-4 py-2 rounded-full bg-purple-100 text-purple-700 font-medium hover:bg-purple-200 transition">
                All
              </button>
              <button className="px-4 py-2 rounded-full bg-green-100 text-green-700 font-medium hover:bg-green-200 transition">
                Mind
              </button>
              <button className="px-4 py-2 rounded-full bg-purple-200 text-purple-800 font-medium hover:bg-purple-300 transition">
                Body
              </button>
              <button className="px-4 py-2 rounded-full bg-indigo-100 text-indigo-700 font-medium hover:bg-indigo-200 transition">
                Soul
              </button>
              <button className="px-4 py-2 rounded-full bg-blue-100 text-blue-700 font-medium hover:bg-blue-200 transition">
                Wellness
              </button>
              <button className="px-4 py-2 rounded-full bg-yellow-100 text-yellow-700 font-medium hover:bg-yellow-200 transition">
                Yoga
              </button>
            </div>
          </div>

          {/* Subscribe Section */}
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-indigo-800 mb-6">Subscribe to Our Newsletter</h2>
            <div className="bg-gradient-to-r from-purple-100 via-pink-100 to-blue-100 p-6 rounded-xl">
              <div className="bg-white/10 p-4 rounded-lg">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Stay Updated</h3>
                <p className="text-gray-700 mb-6">Get our latest wellness articles straight to your inbox.</p>
                <form className="flex gap-2">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="flex-1 px-4 py-2 rounded-lg bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                  <button className="px-6 py-2 rounded-lg bg-main text-white font-semibold hover:brightness-105 transition">
                    Subscribe
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AllArticles;
