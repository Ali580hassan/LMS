import React, { useLayoutEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register GSAP Plugin safely
gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  // ----------------------------------------------------
  // REFS DECLARATIONS
  // ----------------------------------------------------
  const mainRef = useRef(null);
  
  // Requirement 1: Hero Refs
  const heroBadgeRef = useRef(null);
  const heroHeadingRef = useRef(null);
  const heroDescRef = useRef(null);
  const heroCtaRef = useRef(null);

  // Requirement 2: How It Works Pinned Section Refs
  const pinnedSectionRef = useRef(null);
  const stepCardsRef = useRef([]);
  stepCardsRef.current = [];

  // Requirement 3: Grid Cards Refs
  const featureCardsRef = useRef([]);
  featureCardsRef.current = [];

  // Requirement 4: Stats Refs
  const statsSectionRef = useRef(null);
  const statValRefs = useRef([]);
  statValRefs.current = [];

  // Helper function for array refs
  const addToRefs = (el, refArray) => {
    if (el && !refArray.current.includes(el)) {
      refArray.current.push(el);
    }
  };

  // ----------------------------------------------------
  // DATA STRUCTURES
  // ----------------------------------------------------
  const statsData = [
    { label: "Active Students", value: 15000, suffix: "+" },
    { label: "Quality Courses", value: 120, suffix: "+" },
    { label: "Success Rate", value: 98, suffix: "%" },
    { label: "Expert Mentors", value: 45, suffix: "+" }
  ];

  const stepsData = [
    {
      step: "01",
      title: "Enroll in a Track",
      desc: "Choose from industry-vetted learning paths tailored for modern web stack and cloud skills."
    },
    {
      step: "02",
      title: "Hands-on Practice",
      desc: "Build real projects, complete interactive quizzes, and submit code assignments directly."
    },
    {
      step: "03",
      title: "Get Certified",
      desc: "Earn automated, verifiable digital certificates to share on LinkedIn and resume."
    }
  ];

  const features = [
    {
      title: "Course Management",
      desc: "Comprehensive modules with video lessons, ordering, downloadable PDFs, and thumbnail uploads.",
      badge: "Core"
    },
    {
      title: "Interactive Quizzes",
      desc: "Automated question evaluation, real-time score calculations, and historical attempt logs.",
      badge: "Assessment"
    },
    {
      title: "Assignment Portal",
      desc: "Seamless file submissions, instructor grading workflows, and direct feedback loops.",
      badge: "Workflow"
    },
    {
      title: "Verified Certificates",
      desc: "Automatic PDF certificate generation upon course completion with instant verification links.",
      badge: "Rewards"
    },
    {
      title: "Progress Tracking",
      desc: "Granular lesson completion (%), 'Continue Learning' shortcuts, and last-watched sync.",
      badge: "Analytics"
    },
    {
      title: "Role-Based Access",
      desc: "Granular JWT protection tailored specifically for Student, Instructor, and Admin roles.",
      badge: "Security"
    }
  ];

  const dashboards = [
    {
      role: "Student Dashboard",
      points: ["My Enrolled Courses", "Overall Progress (%)", "Quiz & Assignment Portal", "Certificates Hub"]
    },
    {
      role: "Instructor Dashboard",
      points: ["Course Builder Studio", "Total Students Analytics", "Assignment Grading", "Reviews & Ratings"]
    },
    {
      role: "Admin Dashboard",
      points: ["Platform Metrics", "User & Role Controls", "Course Approvals", "Global Statistics"]
    }
  ];

  const backendSpecs = [
    "DTOs & Validation Pipes",
    "Custom Decorators & Guards",
    "Repository Pattern & DI",
    "Swagger API Docs",
    "Query Builders & Transactions",
    "Global Exception Filters"
  ];

  // Hero text split helper (Word-by-Word animation)
  const heroHeadingText = "Master Modern Tech Skills with ";

  // ----------------------------------------------------
  // GSAP ANIMATIONS EFFECT
  // ----------------------------------------------------
  useLayoutEffect(() => {
    // gsap.context handles scope and safe cleanup for React StrictMode
    const ctx = gsap.context(() => {

      // 1. HERO SECTION ANIMATION (On Load Staggered Sequence)
      const words = heroHeadingRef.current?.querySelectorAll('.hero-word');
      const timeline = gsap.timeline({ defaults: { ease: 'power3.out', duration: 0.8 } });

      timeline
        .fromTo(heroBadgeRef.current, { autoAlpha: 0, y: -20 }, { autoAlpha: 1, y: 0 })
        .fromTo(words, 
          { autoAlpha: 0, y: 30, rotateX: -30 }, 
          { autoAlpha: 1, y: 0, rotateX: 0, stagger: 0.05 }, 
          "-=0.4"
        )
        .fromTo(heroDescRef.current, { autoAlpha: 0, y: 20 }, { autoAlpha: 1, y: 0 }, "-=0.4")
        .fromTo(heroCtaRef.current, { autoAlpha: 0, y: 20 }, { autoAlpha: 1, y: 0 }, "-=0.6");


      // 2. "HOW IT WORKS" SCROLL-PINNED SECTION
      // Pinning container while stepping through 3 sequential cards
      const stepTl = gsap.timeline({
        scrollTrigger: {
          trigger: pinnedSectionRef.current,
          start: "top top",
          end: `+=${stepCardsRef.current.length * 100}%`,
          pin: true,
          scrub: 0.8,
          anticipatePin: 1
        }
      });

      stepCardsRef.current.forEach((card, index) => {
        if (index === 0) return; // First card is visible by default
        stepTl.fromTo(card, 
          { autoAlpha: 0, yPercent: 50, scale: 0.9 }, 
          { autoAlpha: 1, yPercent: 0, scale: 1, duration: 1 }
        );
      });


      // 3. FEATURED COURSES / FEATURES GRID (Scroll Staggered Fade + Scale-Up)
      gsap.fromTo(featureCardsRef.current, 
        { autoAlpha: 0, y: 40, scale: 0.92 },
        {
          autoAlpha: 1,
          y: 0,
          scale: 1,
          duration: 0.7,
          stagger: 0.1,
          ease: "back.out(1.2)",
          scrollTrigger: {
            trigger: featureCardsRef.current[0]?.parentElement,
            start: "top 80%",
            toggleActions: "play none none reverse"
          }
        }
      );


      // 4. STATS SECTION (Scroll Into View - Count Up Numbers)
      statValRefs.current.forEach((statEl) => {
        const targetValue = parseInt(statEl.getAttribute('data-target') || '0', 10);
        
        gsap.fromTo(statEl, 
          { textContent: 0 },
          {
            textContent: targetValue,
            duration: 2,
            ease: "power2.out",
            snap: { textContent: 1 }, // Ensures integers without decimals
            scrollTrigger: {
              trigger: statsSectionRef.current,
              start: "top 85%",
              toggleActions: "play none none none"
            }
          }
        );
      });

      // Recalculate positions after all animations & layout renders
      ScrollTrigger.refresh();

    }, mainRef);

    // Cleanup phase
    return () => ctx.revert();
  }, []);

  return (
    <div ref={mainRef} className="space-y-24 py-8 overflow-hidden">
      
      {/* 1. Hero Section */}
      <section className="text-center max-w-4xl mx-auto space-y-6 px-4 pt-6">
        <span 
          ref={heroBadgeRef} 
          className="inline-block px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-amber-900 bg-amber-100 rounded-full border border-amber-200 will-change-transform"
        >
          Complete LMS Platform Ecosystem
        </span>
        
        <h1 
          ref={heroHeadingRef} 
          className="text-4xl sm:text-5xl font-extrabold text-stone-900 tracking-tight leading-tight perspective-1000"
        >
          {heroHeadingText.split(' ').map((word, i) => (
            <span key={i} className="hero-word inline-block mr-2 will-change-transform">
              {word}
            </span>
          ))}
          <span className="hero-word text-amber-700 inline-block will-change-transform">
            EduVerse LMS
          </span>
        </h1>
        
        <p 
          ref={heroDescRef} 
          className="text-lg text-stone-600 max-w-2xl mx-auto leading-relaxed will-change-transform"
        >
          From full-stack course creation to automated certificates, quizzes, and role-based analytics—everything built on an enterprise architecture.
        </p>

        <div 
          ref={heroCtaRef} 
          className="pt-4 flex flex-wrap justify-center gap-4 will-change-transform"
        >
          <Link 
            to="/courses" 
            className="px-6 py-3 text-sm font-semibold text-white bg-amber-800 hover:bg-amber-900 rounded-lg shadow-sm transition"
          >
            Explore Courses
          </Link>
          <Link 
            to="/register" 
            className="px-6 py-3 text-sm font-semibold text-stone-700 bg-stone-100 hover:bg-stone-200 border border-stone-300 rounded-lg transition"
          >
            Create Account
          </Link>
        </div>
      </section>

      {/* 2. "How It Works" Scroll-Pinned Section */}
      <section 
        ref={pinnedSectionRef} 
        className="h-screen w-full flex items-center justify-center bg-[#fdfeea] border border-amber-200/60  text-stone-100 px-4 relative"
      >
        <div className="max-w-4xl w-full mx-auto relative h-[400px]">
          <div className="text-center mb-8">
            <span className="text-gray-400 text-xs font-bold uppercase tracking-widest">Simple Process</span>
            <h2 className="text-3xl font-extrabold text-amber-500 mt-1">How EduVerse Works</h2>
          </div>

          <div className="relative w-full h-full flex items-center justify-center">
            {stepsData.map((step, idx) => (
              <div
                key={idx}
                ref={(el) => addToRefs(el, stepCardsRef)}
                className="absolute inset-0 bg-stone-800 border-2 border-amber-500 rounded-2xl p-8 sm:p-12 flex flex-col justify-center shadow-2xl max-w-2xl mx-auto h-[280px] will-change-transform"
              >
                <div className="flex items-center space-x-4 mb-4">
                  <span className="text-4xl font-black text-amber-500">{step.step}</span>
                  <h3 className="text-2xl font-bold text-white">{step.title}</h3>
                </div>
                <p className="text-stone-300 text-base leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Feature Grid Section */}
      <section className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-2xl font-bold text-stone-900">Platform Features</h2>
          <p className="text-stone-600 text-sm mt-1">Designed for an end-to-end learning and teaching experience</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((item, index) => (
            <div 
              key={index} 
              ref={(el) => addToRefs(el, featureCardsRef)}
              className="p-6 bg-white border border-stone-200 rounded-xl shadow-sm hover:border-amber-400 transition will-change-transform"
            >
              <div className="flex justify-between items-center mb-3">
                <h3 className="font-bold text-stone-900">{item.title}</h3>
                <span className="text-[10px] font-semibold uppercase tracking-wider bg-stone-100 text-stone-600 px-2.5 py-0.5 rounded border border-stone-200">
                  {item.badge}
                </span>
              </div>
              <p className="text-stone-600 text-sm leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 4. Animated Stats Section */}
      <section ref={statsSectionRef} className="max-w-6xl mx-auto px-4">
        <div className="bg-amber-50 border-2 border-amber-400 rounded-2xl p-8 sm:p-10 shadow-sm">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {statsData.map((stat, idx) => (
              <div key={idx} className="space-y-1">
                <div className="text-3xl sm:text-4xl font-extrabold text-amber-900 flex justify-center items-center">
                  <span 
                    ref={(el) => addToRefs(el, statValRefs)} 
                    data-target={stat.value}
                  >
                    0
                  </span>
                  <span>{stat.suffix}</span>
                </div>
                <div className="text-xs sm:text-sm font-medium text-amber-800">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Role-Based Dashboards */}
      <section className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-2xl font-bold text-stone-900">Tailored Dashboards</h2>
          <p className="text-stone-600 text-sm mt-1">Role-based workspaces designed for every type of user</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {dashboards.map((dash, index) => (
            <div key={index} className="bg-white p-6 border border-stone-200 rounded-xl shadow-sm flex flex-col justify-between">
              <div>
                <h3 className="text-lg font-bold text-stone-900 mb-4 border-b border-stone-100 pb-2">{dash.role}</h3>
                <ul className="space-y-2.5">
                  {dash.points.map((pt, pIdx) => (
                    <li key={pIdx} className="flex items-center text-sm text-stone-600">
                      <span className="w-1.5 h-1.5 bg-amber-700 rounded-full mr-2.5 shrink-0"></span>
                      {pt}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-6 pt-4 border-t border-stone-100">
                <span className="text-xs font-semibold text-amber-800">Guarded by Role Authorization →</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Backend & Engineering Highlights */}
      <section className="max-w-6xl mx-auto px-4">
        <div className="bg-[#fefbea] text-stone-100 rounded-2xl p-8 sm:p-10 border-2 border-amber-400">
          <div className="max-w-2xl">
            <span className="text-xs font-mono uppercase text-amber-900 tracking-wider">Phase 14 Engineering</span>
            <h2 className="text-2xl font-bold mt-2 text-amber-900">Robust & Production-Ready Architecture</h2>
            <p className="text-stone-400 text-sm mt-2 leading-relaxed">
              Our platform isn't just user-facing. The backend leverages clean architecture principles, strict validation pipes, and JWT authorization guards.
            </p>
          </div>

          <div className="mt-8 grid grid-cols-2 sm:grid-cols-3 gap-3 font-mono text-xs">
            {backendSpecs.map((spec, index) => (
              <div key={index} className=" border border-amber-900 p-3 rounded-lg text-amber-600 hover:bg-amber-900 hover:text-white">
                ✓ {spec}
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}