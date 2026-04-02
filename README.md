# Eterno Wellness Platform 🧘‍♀️

A comprehensive holistic wellness platform built with React, Tailwind CSS, and Sanity.io. Eterno provides wellness programs for metabolic health, mind-body transformation, along with an integrated e-commerce store for wellness products.

## 🌟 Features

- **Holistic Wellness Programs**: Specialized programs for metabolic health, diabetes reversal, and mind-body transformation
- **E-commerce Store**: Integrated store for wellness and health products
- **Blog Platform**: Health insights and articles from experts
- **Responsive Design**: Fully responsive layout optimized for all devices
- **Modern UI/UX**: Clean, intuitive interface built with Tailwind CSS
- **Headless CMS**: Content managed through Sanity.io
- **Internationalization**: Multi-language support ready
- **Production Ready**: Optimized builds with health checks

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ and npm
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Dharneesh-BR/Eterno.git
   cd Eterno
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   Create a `.env` file:
   ```env
   VITE_SANITY_PROJECT_ID=n5smwbzi
   VITE_SANITY_DATASET=production1
   VITE_SANITY_API_VERSION=2023-07-21
   VITE_SANITY_USE_CDN=true
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```

## 📁 Project Structure

```
src/
├── components/          # Reusable React components
│   ├── BlogPosts.jsx   # Blog listing component
│   ├── Footer.jsx      # Site footer
│   ├── Header.jsx      # Navigation header
│   └── ...
├── pages/              # Page components
│   ├── body/           # Body wellness programs
│   ├── mind/           # Mind wellness programs  
│   ├── soul/           # Soul wellness programs
│   ├── About.jsx       # About page
│   ├── Blog.jsx        # Blog page
│   ├── Contact.jsx     # Contact page
│   ├── Store.jsx       # E-commerce store
│   └── ...
├── hooks/              # Custom React hooks
├── lib/                # API clients and utilities
├── i18n/               # Internationalization
├── utils/              # Utility functions
└── assets/             # Static assets

studio-svasam/          # Sanity Studio (CMS)
├── schemaTypes/        # Content schemas
└── ...
```

## 🛠️ Development Scripts

```bash
# Development
npm run dev              # Start development server
npm run build           # Build for production
npm run preview         # Preview production build

# Production Testing
npm run build:prod      # Build with production environment
npm run preview:prod    # Preview with production settings
npm run test:prod       # Build and test production environment

# Windows users can also use:
test-production.bat     # Automated production testing
```

## 🌐 Environment Configuration

### Development (.env)
```env
VITE_SANITY_PROJECT_ID=n5smwbzi
VITE_SANITY_DATASET=production1
VITE_SANITY_API_VERSION=2023-07-21
VITE_SANITY_USE_CDN=true
```

### Production (.env.production)
```env
VITE_SANITY_PROJECT_ID=n5smwbzi
VITE_SANITY_DATASET=production1
VITE_SANITY_API_VERSION=2023-07-21
VITE_SANITY_USE_CDN=true
```

## 🚀 Deployment

### Netlify (Recommended)
The project is configured for Netlify deployment:

1. **Automatic Deployment**
   - Push to `main` branch triggers deployment
   - Build command: `npm run build`
   - Publish directory: `dist`

2. **Manual Deployment**
   ```bash
   npm run build
   # Upload dist/ folder to Netlify
   ```

### Alternative Deployments
- **Vercel**: Use `npm run vercel-build`
- **Manual**: Use `deploy.sh` script

### Sanity Studio (CMS)

Sanity Studio lives in `studio-svasam/`.

1. **Install dependencies**
   ```bash
   cd studio-svasam
   npm install
   ```

2. **Run locally**
   ```bash
   npm run dev
   ```

3. **Deploy Studio**
   ```bash
   npm run deploy
   ```

## 🎨 Key Features

### Wellness Categories
- **Mind**: Manifestation, stress reduction, brain training
- **Body**: Yoga, nutrition, naturopathy treatments  
- **Soul**: Trauma healing, sound therapy, breathwork

### E-commerce Store
- Product catalog with images and descriptions
- Shopping cart functionality
- Responsive product grid
- Search and filtering capabilities

### Content Management
- Sanity.io headless CMS
- Real-time content updates
- Media management
- Blog post creation

### Technical Features
- **Performance**: Optimized builds with code splitting
- **SEO**: Meta tags and structured data
- **Accessibility**: WCAG compliant components
- **Security**: Secure API configurations
- **Monitoring**: Health checks and error tracking

## 🔧 Configuration

### Sanity Configuration
Located in `src/lib/sanity.js`:
- Automatic project ID validation
- CDN optimization
- Error handling and logging
- Health check utilities

### Build Configuration
Located in `vite.config.js`:
- Code splitting optimization
- Asset optimization
- Development server settings

## 🌍 Internationalization

The project includes a comprehensive i18n structure:
- Translation files in `src/i18n/`
- Parameter interpolation support
- Ready for multiple languages
- All UI text externalized

## 🧪 Testing Production

Use the built-in production testing:

```bash
# Quick test
npm run test:prod

# Windows batch script
test-production.bat

# Manual testing
npm run build:prod
npm run preview:prod
# Visit http://localhost:3000
```

## 📝 Content Management

### Sanity Studio
Access the CMS at your Sanity Studio URL to manage:
- Wellness programs
- Store products  
- Blog posts
- Instructor profiles
- Media assets

### Content Types
- `program`: Wellness programs
- `storeItem`: E-commerce products
- `blogPost`: Blog articles
- `author`: Instructors (display name in Studio)

### Notes
- Blog posts no longer include an `author` field.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

For support and questions:
- Email: support@svasam.com
- Phone: +91 1234567890
- Hours: Mon-Sat, 10 AM - 7 PM

---

**Built with ❤️ for holistic wellness and spiritual growth**