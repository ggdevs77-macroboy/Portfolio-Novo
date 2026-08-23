import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { translations } from './translations';

export default function App() {
  const [lang, setLang] = useState('pt');
  
  // Efeito "Glow" Dinâmico do Mouse
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // --- Sistema de Navegação da Linha do Tempo (O Nó de Energia) ---
  const expRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: expRef,
    offset: ["start center", "end center"]
  });
  const shipTop = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  const t = translations[lang];

  useEffect(() => {
    const handleMouseMove = (e) => setMousePosition({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Animação de Mola (Spring) super suave
  const springFadeUp = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 70, damping: 20, mass: 1 } }
  };

  return (
    <div className="min-h-screen bg-[#050505] text-zinc-300 font-sans selection:bg-cyan-500/30 overflow-x-hidden relative">
      
      {/* 1. Iluminação Dinâmica do Mouse (Premium) */}
      <div 
        className="pointer-events-none fixed inset-0 z-30 transition-opacity duration-300"
        style={{ background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(255,255,255,0.04), transparent 40%)` }}
      />

      {/* 2. Textura de Granulação */}
      <div className="fixed inset-0 opacity-[0.02] mix-blend-overlay pointer-events-none z-0" style={{ backgroundImage: 'url("https://grainy-gradients.vercel.app/noise.svg")' }}></div>

      {/* Background Sutil Base */}
      <div className="fixed top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-cyan-900/10 blur-[120px] rounded-full"></div>
      </div>

      {/* Navbar Premium com Efeito de Vidro */}
      <nav className="max-w-7xl mx-auto px-6 py-8 flex justify-between items-center relative z-40 backdrop-blur-md bg-[#050505]/60 sticky top-0 border-b border-white/5 shadow-sm">
        <h1 className="text-2xl font-bold text-white tracking-tighter font-['Space_Grotesk']">gustavo<span className="text-cyan-500">.</span>dev</h1>
        <div className="flex items-center gap-6 text-sm font-medium">
          <a href="#sobre" className="hidden md:block text-zinc-400 hover:text-white transition-colors">{t.navAbout}</a>
          <a href="#projetos" className="hidden md:block text-zinc-400 hover:text-white transition-colors">{t.navProjects}</a>
          <div className="h-4 w-px bg-zinc-800 hidden md:block"></div>
          <button onClick={() => setLang(lang === 'pt' ? 'en' : 'pt')} className="text-zinc-400 hover:text-white transition-colors flex items-center gap-1 group font-['JetBrains_Mono']">
            {lang === 'pt' ? 'PT-BR' : 'EN-US'}
            <svg className="w-3 h-3 group-hover:rotate-180 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <motion.section initial="hidden" animate="visible" variants={springFadeUp} className="max-w-7xl mx-auto px-6 pt-24 pb-32 flex flex-col justify-center min-h-[70vh] relative z-20">
        <h2 className="text-6xl md:text-8xl lg:text-[7.5rem] font-bold tracking-tighter leading-[1.05] text-white font-['Space_Grotesk']">
          {t.heroTitle1} <br />
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-zinc-300 to-zinc-600">{t.heroTitle2}</span>
          <span className="animate-pulse text-cyan-500 font-light ml-2" style={{ animationDuration: '0.8s' }}>|</span>
        </h2>
        
        <div className="mt-16 flex flex-col md:flex-row justify-between items-start md:items-end gap-10">
          
          <div className="flex flex-col gap-8">
            <p className="max-w-lg text-zinc-400 text-base md:text-lg leading-relaxed font-light">
              {t.heroSubtitle}
            </p>
            
            {/* BOTÕES DE AÇÃO */}
            <div className="flex flex-wrap items-center gap-4 font-['Space_Grotesk']">
              <a href="https://linkedin.com/in/gustavo-vieira-42a16b387/" target="_blank" rel="noreferrer" className="px-8 py-3 rounded-full bg-white text-black font-bold hover:bg-cyan-400 hover:scale-105 transition-all duration-300">
                {t.heroBtnContact}
              </a>
              <a href="#projetos" className="px-8 py-3 rounded-full bg-transparent text-white font-bold border border-white/20 hover:border-white hover:bg-white/10 transition-all duration-300">
                {t.heroBtnProjects}
              </a>
            </div>
          </div>
          
          <div className="flex gap-16 text-left font-['JetBrains_Mono']">
            <div className="flex flex-col gap-1 group cursor-default">
              <span className="text-3xl font-bold text-white group-hover:text-cyan-400 transition-colors">2021</span>
              <span className="text-[10px] text-zinc-500 uppercase tracking-widest">{t.statsDesc1}</span>
            </div>
            <div className="flex flex-col gap-1 group cursor-default">
              <span className="text-3xl font-bold text-white group-hover:text-cyan-400 transition-colors">&lt;/&gt;</span>
              <span className="text-[10px] text-zinc-500 uppercase tracking-widest">{t.statsTool}</span>
            </div>
          </div>
        </div>
      </motion.section>

      {/* About Section com Imagem Expandida e Badge Giratório */}
      <section id="sobre" className="max-w-7xl mx-auto px-6 py-32 border-t border-white/5 relative z-20">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-16 items-center">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={springFadeUp} className="md:col-span-5 relative flex justify-center md:justify-start group mt-8 md:mt-0">
             
             {/* Badge Circular Girando */}
             <div className="absolute -top-12 -left-4 md:-top-16 md:-left-12 w-32 h-32 md:w-44 md:h-44 animate-[spin_12s_linear_infinite] opacity-90 z-20 pointer-events-none drop-shadow-xl text-cyan-100">
              <svg viewBox="0 0 100 100" width="100%" height="100%">
                <defs><path id="circlePath" d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0" /></defs>
                <text fontSize="12" fontWeight="700" fill="currentColor" letterSpacing="4.5" className="font-['Space_Grotesk']">
                  <textPath href="#circlePath">* SUPORTE * DEV * ADS </textPath>
                </text>
              </svg>
            </div>

            <div className="absolute inset-0 bg-cyan-500/10 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 rounded-[2.5rem]"></div>
            
            {/* Foto */}
            <div className="w-full max-w-[460px] aspect-[4/5] rounded-[2rem] overflow-hidden bg-[#0a0a0c] border border-white/5 shadow-2xl relative z-10 group-hover:border-white/15 transition-colors duration-500">
              <img src="/foto.png" alt="Gustavo Vieira" className="w-full h-full object-cover object-top grayscale contrast-[1.1] brightness-90 group-hover:grayscale-0 group-hover:brightness-100 transition-all duration-700 group-hover:scale-105" />
            </div>
          </motion.div>

          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={springFadeUp} className="md:col-span-7">
            <h3 className="text-3xl md:text-5xl font-bold text-white mb-8 tracking-tight font-['Space_Grotesk']">{t.aboutTitle}</h3>
            <div className="space-y-6 text-zinc-400 text-base md:text-lg leading-relaxed font-light">
              <p>{t.aboutText1}</p>
              <p>{t.aboutText2}</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Skills Section (Cartões Escuros com Brilho Interativo) */}
      <section className="max-w-7xl mx-auto px-6 py-24 relative z-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16">
          
          {/* Hard Skills */}
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={springFadeUp}>
            <div className="flex items-center gap-4 mb-8">
              <h3 className="text-3xl md:text-4xl font-bold text-white tracking-tight font-['Space_Grotesk']">{t.skillsTitle1 || "Hard Skills"}</h3>
              <div className="h-px flex-1 bg-gradient-to-r from-cyan-500/20 to-transparent"></div>
            </div>
            
            <div className="bg-[#0a0a0c] border border-white/5 rounded-3xl p-8 md:p-10 shadow-2xl relative overflow-hidden group">
              <div className="absolute -top-24 -right-24 w-64 h-64 bg-cyan-500/10 blur-[100px] rounded-full pointer-events-none transition-opacity group-hover:bg-cyan-500/20"></div>
              <div className="flex flex-wrap gap-3 relative z-10">
                {t.hardSkills.map(skill => (
                  <span key={skill} className="bg-[#121214] text-zinc-400 border border-white/5 px-5 py-2.5 rounded-xl text-sm font-medium tracking-wide hover:border-cyan-500/50 hover:text-cyan-300 hover:bg-cyan-500/5 hover:-translate-y-1 transition-all cursor-default shadow-lg flex items-center gap-2.5 font-['JetBrains_Mono']">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-500/60 shadow-[0_0_8px_rgba(6,182,212,0.8)]"></span>
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Soft Skills */}
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={springFadeUp} transition={{ delay: 0.1 }}>
            <div className="flex items-center gap-4 mb-8">
              <h3 className="text-3xl md:text-4xl font-bold text-white tracking-tight font-['Space_Grotesk']">{t.skillsTitle2 || "Soft Skills"}</h3>
              <div className="h-px flex-1 bg-gradient-to-r from-violet-500/20 to-transparent"></div>
            </div>
            
            <div className="bg-[#0a0a0c] border border-white/5 rounded-3xl p-8 md:p-10 shadow-2xl relative overflow-hidden group">
              <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-violet-500/10 blur-[100px] rounded-full pointer-events-none transition-opacity group-hover:bg-violet-500/20"></div>
              <div className="flex flex-wrap gap-3 relative z-10">
                {t.softSkills.map(skill => (
                  <span key={skill} className="bg-[#121214] text-zinc-400 border border-white/5 px-5 py-2.5 rounded-xl text-sm font-medium tracking-wide hover:border-violet-500/50 hover:text-violet-300 hover:bg-violet-500/5 hover:-translate-y-1 transition-all cursor-default shadow-lg flex items-center gap-2.5 font-['JetBrains_Mono']">
                    <span className="w-1.5 h-1.5 rounded-full bg-violet-500/60 shadow-[0_0_8px_rgba(139,92,246,0.8)]"></span>
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>

        </div>
      </section>

      {/* Experience Section (Linha do Tempo com Nó de Energia e Conexões) */}
      <section ref={expRef} className="max-w-5xl mx-auto px-6 py-32 border-t border-white/5 relative z-20">
        <motion.h3 initial="hidden" whileInView="visible" viewport={{ once: true }} variants={springFadeUp} className="text-3xl md:text-5xl font-bold text-white mb-24 text-center tracking-tight font-['Space_Grotesk']">
          {t.expTitle || "Minha experiência"}
        </motion.h3>

        <div className="relative flex flex-col md:flex-row gap-0 md:gap-8 lg:gap-12">
          
          <div className="hidden md:flex w-16 relative flex-col items-center py-10 shrink-0">
            <div className="absolute top-0 bottom-0 w-px border-l-2 border-dashed border-zinc-800"></div>
            <motion.div style={{ top: shipTop }} className="absolute w-4 h-4 rounded-full bg-cyan-400 shadow-[0_0_20px_5px_rgba(34,211,238,0.4)] z-30 flex items-center justify-center border-2 border-[#050505] -ml-[1px]">
              <div className="absolute w-10 h-10 rounded-full bg-cyan-400/30 animate-ping"></div>
            </motion.div>
          </div>

          <div className="flex-1 space-y-12 relative z-10 pb-20">
            {t.jobs.map((job, idx) => (
              <motion.div key={idx} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={springFadeUp} className="relative group">
                <div className="hidden md:block absolute top-10 -left-8 lg:-left-12 w-8 lg:w-12 h-px bg-gradient-to-r from-zinc-800 to-zinc-600 group-hover:from-cyan-500/50 group-hover:to-cyan-400 transition-colors duration-500"></div>

                <div className="relative p-8 rounded-2xl bg-[#0a0a0c] border border-white/5 hover:border-white/10 transition-all shadow-2xl overflow-hidden">
                  
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-500 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  
                  <div className="flex flex-col lg:flex-row justify-between lg:items-start mb-6 relative z-10 gap-4 lg:gap-0">
                    <div className="flex items-start gap-4">
                      <div className="mt-1 p-2 bg-white/5 rounded-lg text-zinc-500 group-hover:text-cyan-400 group-hover:bg-cyan-500/10 transition-colors">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
                      </div>
                      <div>
                        <h4 className="text-xl md:text-2xl font-bold text-white group-hover:text-cyan-50 transition-colors font-['Space_Grotesk']">{job.role}</h4>
                        <p className="text-zinc-500 mt-1 font-medium">{job.company}</p>
                      </div>
                    </div>
                    
                    <p className="text-xs font-['JetBrains_Mono'] text-zinc-400 px-4 py-1.5 bg-[#121214] border border-white/10 rounded-full tracking-wider w-fit shrink-0 group-hover:border-cyan-500/30 group-hover:text-cyan-200 transition-colors">
                      {job.date}
                    </p>
                  </div>
                  <p className="text-sm md:text-base text-zinc-400 leading-relaxed font-light relative z-10">
                    {job.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projetos" className="max-w-7xl mx-auto px-6 py-32 border-t border-white/5 relative z-20">
        <motion.h3 initial="hidden" whileInView="visible" viewport={{ once: true }} variants={springFadeUp} className="text-3xl md:text-5xl font-bold text-white mb-16 tracking-tight font-['Space_Grotesk']">
          {t.projectsTitle}
        </motion.h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Projeto 1 */}
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={springFadeUp} className="group relative p-6 md:p-8 rounded-3xl bg-[#0a0a0c] border border-white/5 hover:border-white/10 transition-all overflow-hidden flex flex-col justify-between shadow-2xl">
            <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
            
            <div className="relative z-10 flex flex-col flex-grow">
              <a href="/projeto1.jpeg" target="_blank" rel="noreferrer" className="block w-full h-56 md:h-64 mb-8 rounded-2xl overflow-hidden relative bg-[#121214] border border-white/5 group/image cursor-pointer">
                <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '16px 16px' }}></div>
                <img src="/projeto1.jpeg" alt="Nexus Optimizer" className="w-full h-full object-cover object-top opacity-70 group-hover/image:opacity-100 transform scale-100 group-hover/image:scale-110 transition-all duration-1000 ease-[cubic-bezier(0.25,1,0.5,1)]" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0c] via-[#0a0a0c]/40 to-transparent opacity-90 group-hover/image:opacity-20 transition-opacity duration-700"></div>
                
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover/image:opacity-100 transition-all duration-700 z-10 translate-y-8 group-hover/image:translate-y-0">
                   <span className="bg-white/10 backdrop-blur-md text-white px-6 py-2.5 rounded-full text-sm font-medium border border-white/20 shadow-2xl flex items-center gap-2">
                      Ver Projeto <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                   </span>
                </div>
              </a>

              <div className="flex items-end gap-4 mb-4 font-['Space_Grotesk']">
                <div className="text-4xl font-extrabold text-zinc-800/80 group-hover:text-zinc-600 transition-colors leading-none">01</div>
                <h4 className="text-2xl font-bold text-white leading-none pb-0.5">{t.nexusDesc.split('.')[0]}</h4>
              </div>
              <p className="text-base text-zinc-400 mb-8 font-light line-clamp-3">{t.nexusDesc.split('.').slice(1).join('.')}</p>
            </div>
            
            <div className="flex flex-wrap gap-4 mt-auto pt-4 relative z-10 border-t border-white/5">
              <div className="flex flex-col items-center justify-center gap-3 w-[5.5rem] h-[5.5rem] mt-4 rounded-t-xl rounded-b-md bg-[#121214] border-b-[3px] border-zinc-800 hover:border-zinc-400 shadow-xl relative overflow-hidden group/card hover:-translate-y-1 transition-all">
                <span className="text-[10px] font-bold font-['JetBrains_Mono'] text-zinc-500 group-hover/card:text-zinc-300 transition-colors tracking-wider uppercase">Python</span>
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7 text-zinc-600 group-hover/card:text-zinc-200 transition-colors drop-shadow-[0_0_8px_rgba(255,255,255,0.1)]"><path d="M12.001 2.003c-2.825 0-3.325.495-3.325.495l-.001 2.296h3.407v.596H8.083c-.854 0-1.748.24-2.457.81C4.94 6.756 4.7 8.211 4.7 9.593c0 2.253.945 3.14 3.12 3.14h1.002v-1.71c0-1.577 1.3-2.88 2.898-2.88h3.334c1.17 0 2.13-.961 2.13-2.128V4.13c0-1.168-.96-2.128-2.13-2.128h-3.053zm-.81 1.637a.808.808 0 1 1 0 1.616.808.808 0 0 1 0-1.616zM15.917 11.27c.854 0 1.748.238 2.457.81 1.687.555 1.926 2.01 1.926 3.39 0 2.254-.945 3.14-3.12 3.14h-1.002v-1.71c0-1.577-1.3-2.88-2.898-2.88H9.946c-1.17 0-2.13.961-2.13 2.128v1.996c0 1.168.96 2.128 2.13 2.128h3.053c2.825 0 3.325-.495 3.325-.495l.001-2.296h-3.407v-.596h3.999c.854 0 1.748-.24 2.457-.81 1.687-.555 1.926-2.01 1.926-3.39 0-2.253-.945-3.14-3.12-3.14h-3.235zM12.81 19.544a.808.808 0 1 1 0 1.616.808.808 0 0 1 0-1.616z"/></svg>
              </div>
              <div className="flex flex-col items-center justify-center gap-3 w-[5.5rem] h-[5.5rem] mt-4 rounded-t-xl rounded-b-md bg-[#121214] border-b-[3px] border-zinc-800 hover:border-zinc-400 shadow-xl relative overflow-hidden group/card hover:-translate-y-1 transition-all">
                <span className="text-[10px] font-bold font-['JetBrains_Mono'] text-zinc-500 group-hover/card:text-zinc-300 transition-colors tracking-wider uppercase">P.Shell</span>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7 text-zinc-600 group-hover/card:text-zinc-200 transition-colors drop-shadow-[0_0_8px_rgba(255,255,255,0.1)]"><polyline points="4 17 10 11 4 5"></polyline><line x1="12" y1="19" x2="20" y2="19"></line></svg>
              </div>
            </div>
          </motion.div>

          {/* Projeto 2 */}
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={springFadeUp} transition={{ delay: 0.1 }} className="group relative p-6 md:p-8 rounded-3xl bg-[#0a0a0c] border border-white/5 hover:border-white/10 transition-all overflow-hidden flex flex-col justify-between shadow-2xl">
            <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
            
            <div className="relative z-10 flex flex-col flex-grow">
              <a href="/projeto2.jpeg" target="_blank" rel="noreferrer" className="block w-full h-56 md:h-64 mb-8 rounded-2xl overflow-hidden relative bg-[#121214] border border-white/5 group/image cursor-pointer">
                <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '16px 16px' }}></div>
                <img src="/projeto2.jpeg" alt="Portal ERP Corporativo" className="w-full h-full object-cover object-top opacity-70 group-hover/image:opacity-100 transform scale-100 group-hover/image:scale-110 transition-all duration-1000 ease-[cubic-bezier(0.25,1,0.5,1)]" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0c] via-[#0a0a0c]/40 to-transparent opacity-90 group-hover/image:opacity-20 transition-opacity duration-700"></div>
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover/image:opacity-100 transition-all duration-700 z-10 translate-y-8 group-hover/image:translate-y-0">
                   <span className="bg-white/10 backdrop-blur-md text-white px-6 py-2.5 rounded-full text-sm font-medium border border-white/20 shadow-2xl flex items-center gap-2">
                      Ver Projeto <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                   </span>
                </div>
              </a>

              <div className="flex items-end gap-4 mb-4 font-['Space_Grotesk']">
                <div className="text-4xl font-extrabold text-zinc-800/80 group-hover:text-zinc-600 transition-colors leading-none">02</div>
                <h4 className="text-2xl font-bold text-white leading-none pb-0.5">{t.erpDesc.split('.')[0]}</h4>
              </div>
              <p className="text-base text-zinc-400 mb-8 font-light line-clamp-3">{t.erpDesc.split('.').slice(1).join('.')}</p>
            </div>
            
            <div className="flex flex-wrap gap-4 mt-auto pt-4 relative z-10 border-t border-white/5">
              <div className="flex flex-col items-center justify-center gap-3 w-[5.5rem] h-[5.5rem] mt-4 rounded-t-xl rounded-b-md bg-[#121214] border-b-[3px] border-zinc-800 hover:border-zinc-400 shadow-xl relative overflow-hidden group/card hover:-translate-y-1 transition-all">
                <span className="text-[10px] font-bold font-['JetBrains_Mono'] text-zinc-500 group-hover/card:text-zinc-300 transition-colors tracking-wider uppercase">Flask</span>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7 text-zinc-600 group-hover/card:text-zinc-200 transition-colors drop-shadow-[0_0_8px_rgba(255,255,255,0.1)]"><path d="M9 2v5.5l-6.5 9A2 2 0 0 0 4 19.5h16a2 2 0 0 0 1.5-3l-6.5-9V2h-4z"></path><path d="M8.5 13.5l2.5-3.5V4h2v6l2.5 3.5h-7z"></path></svg>
              </div>
              <div className="flex flex-col items-center justify-center gap-3 w-[5.5rem] h-[5.5rem] mt-4 rounded-t-xl rounded-b-md bg-[#121214] border-b-[3px] border-zinc-800 hover:border-zinc-400 shadow-xl relative overflow-hidden group/card hover:-translate-y-1 transition-all">
                <span className="text-[10px] font-bold font-['JetBrains_Mono'] text-zinc-500 group-hover/card:text-zinc-300 transition-colors tracking-wider uppercase">Postgre</span>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7 text-zinc-600 group-hover/card:text-zinc-200 transition-colors drop-shadow-[0_0_8px_rgba(255,255,255,0.1)]"><ellipse cx="12" cy="5" rx="9" ry="3"></ellipse><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"></path><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"></path></svg>
              </div>
              <div className="flex flex-col items-center justify-center gap-3 w-[5.5rem] h-[5.5rem] mt-4 rounded-t-xl rounded-b-md bg-[#121214] border-b-[3px] border-zinc-800 hover:border-zinc-400 shadow-xl relative overflow-hidden group/card hover:-translate-y-1 transition-all">
                <span className="text-[10px] font-bold font-['JetBrains_Mono'] text-zinc-500 group-hover/card:text-zinc-300 transition-colors tracking-wider uppercase">WSGI</span>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7 text-zinc-600 group-hover/card:text-zinc-200 transition-colors drop-shadow-[0_0_8px_rgba(255,255,255,0.1)]"><rect x="2" y="2" width="20" height="8" rx="2" ry="2"></rect><rect x="2" y="14" width="20" height="8" rx="2" ry="2"></rect><line x1="6" y1="6" x2="6.01" y2="6"></line><line x1="6" y1="18" x2="6.01" y2="18"></line></svg>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* SEÇÃO DE CONTATO (Chamada para Ação Final) */}
      <section className="max-w-7xl mx-auto px-6 py-32 relative z-20">
        <motion.div 
          initial="hidden" whileInView="visible" viewport={{ once: true }} variants={springFadeUp}
          className="relative rounded-[3rem] bg-gradient-to-b from-[#0a0a0c] to-[#050505] border border-white/5 p-10 md:p-20 text-center overflow-hidden group shadow-2xl"
        >
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[80%] h-1 bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
          <div className="absolute -bottom-24 left-1/2 -translate-x-1/2 w-96 h-96 bg-cyan-500/10 blur-[120px] rounded-full pointer-events-none transition-opacity duration-700 group-hover:bg-cyan-500/20"></div>

          <h2 className="text-4xl md:text-6xl font-bold text-white mb-6 font-['Space_Grotesk'] tracking-tighter">
            {t.contactTitle1} <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">{t.contactTitle2}</span>
          </h2>
          <p className="text-zinc-400 max-w-xl mx-auto mb-10 text-base md:text-lg font-light">
            {t.contactDesc}
          </p>
          
          <a href="mailto:ggdevs77@gmail.com" className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-[#121214] text-white font-bold border border-white/10 hover:border-cyan-500/50 hover:bg-cyan-500/10 hover:-translate-y-1 transition-all duration-300 shadow-xl font-['Space_Grotesk']">
            <svg className="w-5 h-5 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
            ggdevs77@gmail.com
          </a>
        </motion.div>
      </section>

      {/* Footer Minimalista mas com Estilo */}
      <footer className="max-w-7xl mx-auto px-6 py-12 mt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-start md:items-end gap-12 relative z-20 font-['JetBrains_Mono'] text-xs text-zinc-500 uppercase tracking-widest">
        <div className="flex flex-col gap-2">
          <span className="text-zinc-300 font-bold">Gustavo Vieira</span>
          <span className="hover:text-cyan-400 transition-colors cursor-pointer">ggdevs77@gmail.com</span>
        </div>
        <div className="flex gap-8">
          <a href="https://linkedin.com/in/gustavo-vieira-42a16b387/" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">LinkedIn</a>
          <a 
            href={lang === 'pt' ? "/Curriculo_Gustavo_Vieira.pdf" : "/Gustavo_Vieira_Resume_EN.pdf"} 
            download
            target="_blank" 
            rel="noreferrer" 
            className="hover:text-white transition-colors"
          >
            Currículo
          </a>
        </div>
      </footer>

      {/* Selo Flutuante Discreto */}
      <div className="fixed bottom-6 right-6 bg-[#050505]/80 backdrop-blur-md border border-white/10 px-4 py-2 rounded-full flex items-center gap-2 z-50 shadow-2xl hover:border-cyan-500/30 transition-colors">
        <span className="w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_10px_rgba(34,211,238,0.5)] animate-pulse"></span>
        <span className="text-[10px] font-bold font-['JetBrains_Mono'] text-zinc-300 uppercase tracking-wider">Status: Ops</span>
      </div>

    </div>
  );
}