# Changelog

All notable changes to the Svasam project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [1.0.1] - 2025-08-13

### Security
- Updated esbuild to fix CWE-346 vulnerability
- Fixed shell script carriage return issues

### Performance
- Optimized React components by removing inline arrow functions
- Improved render performance in Store component

### Fixed
- Added required validation to Sanity blog post author field
- Fixed Node.js engine compatibility
- Removed carriage returns from build.sh script

### Added
- Basic internationalization structure
- Stable callback functions for better performance

## [1.0.0] - 2025-08-03

### Added
- Initial project setup with React, Vite, and Tailwind CSS
- Sanity.io integration for content management
- Basic page structure for Mind, Body, and Soul sections
- E-commerce store functionality
- Responsive design implementation

### Changed
- Updated Sanity client configuration for better error handling
- Improved API request handling and error messages
- Enhanced documentation and project structure

### Fixed
- Resolved CORS issues with Sanity API
- Fixed malformed API URL in Sanity client
- Addressed deployment configuration for Netlify

## [0.1.0] - 2025-08-03

### Added
- Initial release of Svasam wellness platform
- Basic authentication and user management
- Content management system integration
- E-commerce functionality
- Responsive design for all devices

### Known Issues
- Some edge cases in form validation may need attention
- Performance optimizations for mobile devices in progress
- Additional testing required for all user flows

---

This changelog format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/).
