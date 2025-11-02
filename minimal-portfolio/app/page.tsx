"use client"

import Link from "next/link"
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogHeader,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog"
import { useEffect, useRef, useState } from "react"

export default function Home() {
  const [isDark, setIsDark] = useState(false)
  const [activeSection, setActiveSection] = useState("")
  const sectionsRef = useRef<(HTMLElement | null)[]>([])

  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDark)
  }, [isDark])

  useEffect(() => {
    // On mobile we want each .anim-item to animate independently as it scrolls into view
    const mqMobile = window.matchMedia("(max-width: 767px)")

    if (mqMobile.matches) {
      const itemObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              const el = entry.target as HTMLElement
              const dir = (el.dataset?.anim as string) || "up"
              const cls = dir === "left" ? "animate-fade-in-left" : dir === "right" ? "animate-fade-in-right" : "animate-fade-in-up"
              el.classList.add(cls)
              // mark section active if this item belongs to a section
              const section = el.closest("section") as HTMLElement | null
              if (section) setActiveSection(section.id)
              // stop observing once animated
              itemObserver.unobserve(el)
            }
          })
        },
        { threshold: 0.25, rootMargin: "0px 0px -10% 0px" },
      )

      const items = Array.from(document.querySelectorAll<HTMLElement>(".anim-item"))
      items.forEach((it) => itemObserver.observe(it))

      return () => itemObserver.disconnect()
    } else {
      // Desktop/tablet: animate per-section with staggered children
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              const target = entry.target as HTMLElement
              // animate the section container
              target.classList.add("animate-fade-in-up")
              setActiveSection(target.id)

              // animate marked children with a small stagger
              const animatedChildren = Array.from(target.querySelectorAll<HTMLElement>(".anim-item"))
              const STAGGER = 80
              animatedChildren.forEach((el, i) => {
                const dir = (el.dataset?.anim as string) || "up"
                const cls = dir === "left" ? "animate-fade-in-left" : dir === "right" ? "animate-fade-in-right" : "animate-fade-in-up"
                // stagger each child slightly (reduced)
                setTimeout(() => el.classList.add(cls), i * STAGGER)
              })
            }
          })
        },
        { threshold: 0.15, rootMargin: "0px 0px -10% 0px" },
      )

      sectionsRef.current.forEach((section) => {
        if (section) observer.observe(section)
      })

      return () => observer.disconnect()
    }
  }, [])

  const toggleTheme = () => {
    setIsDark(!isDark)
  }

  return (
    <div
      className="w-full min-h-screen bg-cover bg-center bg-no-repeat text-foreground relative"
      style={{ backgroundImage: isDark ? "url('/fondo3.jpg')" : "url('/fondo8.jpg')" }}
    >
      <nav className="fixed left-8 top-1/2 -translate-y-1/2 z-10 hidden lg:block">
        <div className="flex flex-col gap-4">
          {["intro", "work", "thoughts", "connect"].map((section) => (
            <button
              key={section}
              onClick={() => document.getElementById(section)?.scrollIntoView({ behavior: "smooth" })}
              className={`w-2 h-8 rounded-full transition-all duration-500 ${
                activeSection === section ? "bg-foreground" : "bg-muted-foreground/30 hover:bg-muted-foreground/60"
              }`}
              aria-label={`Navigate to ${section}`}
            />
          ))}
        </div>
      </nav>

      {/* Theme toggle fixed in the top-left (next to the logo) */}
      <button
        onClick={toggleTheme}
        aria-label="Toggle theme"
        className="fixed top-4 right-4 z-50 group p-2 rounded-lg border border-border hover:border-muted-foreground/50 transition-all duration-300 bg-background/80 backdrop-blur-sm"
      >
        {isDark ? (
          <svg
            className="w-4 h-4 text-muted-foreground group-hover:text-foreground transition-colors duration-300"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
              clipRule="evenodd"
            />
          </svg>
        ) : (
          <svg
            className="w-4 h-4 text-muted-foreground group-hover:text-foreground transition-colors duration-300"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
          </svg>
        )}
      </button>

      <main className="w-full min-h-screen">
        <div className="max-w-4xl mx-auto px-6 sm:px-8 lg:px-16">

        <header
          id="intro"
          ref={(el) => {
            sectionsRef.current[0] = el
          }}
          className="min-h-screen flex items-center opacity-0 pt-28 sm:pt-32 md:pt-36 lg:pt-20 xl:pt-24"
        >
          <div className="grid lg:grid-cols-5 gap-2 sm:gap-6 lg:gap-16 w-full">
            <div className="lg:col-span-3 space-y-4 sm:space-y-6 anim-item" data-anim="left">
              <div className="space-y-3 sm:space-y-2">
                <div className="text-sm text-foreground font-mono tracking-wider"></div>
                <h1 className="text-5xl sm:text-6xl lg:text-7xl font-light tracking-tight">
                  Kevin
                  <br />
                  <span className="text-foreground">Pelaez Cruzado</span>
                </h1>
              </div>

              <div className="space-y-6 max-w-md">
                <p className="text-lg sm:text-xl leading-relaxed">
                  Abogado peruano especializado en construcción, arbitraje y gestión pública. Maestrías en Arbitraje y Mediación, y en Gestión Pública. Catedrático de Derecho y Ciencias Políticas de la UPAO.
                  <span className="text-foreground"></span><span className="text-foreground"></span>

                  <span className="text-foreground"></span>
                </p>

                <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 text-sm text-foreground">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                    Disponible para consultas
                  </div>
                  <div>La Libertad, Trujillo - Perú</div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-2 flex flex-col justify-start sm:justify-end space-y-2 sm:space-y-4 -mt-2 sm:mt-2 lg:mt-0 anim-item" data-anim="right">
              <img
                src="KEVIN_PELAEZ_CRUZADO-1.png"
                alt="Kevin Pelaez Cruzado"
                /* shadow-md */ 
                className="rounded-md w-40 sm:w-48 md:w-56 lg:w-full h-auto object-cover mx-auto"
              />
              <div className="space-y-4">
                <div className="text-md text-foreground font-mono">Conoce un poco más sobre mi:</div>
                <div className="space-y-2">
                  <Dialog>
                    <DialogTrigger asChild>
                      <button
                        type="button"
                        aria-haspopup="dialog"
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-background/70 border border-border text-foreground font-medium hover:bg-muted-foreground/10 transition-all duration-200 shadow-sm hover:shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                      >
                        <span className="text-base sm:text-sm">Conocer detalles</span>
                      </button>
                    </DialogTrigger>

                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Kevin Peláez Cruzado</DialogTitle>
                        <DialogDescription>
                          Abogado peruano especializado en construcción, arbitraje y gestión pública, con maestrías en Arbitraje y Mediación (Universidad de Salamanca) y en Gestión Pública.
                          Experiencia asesorando en sector privado como a los distintos niveles de gobierno en contrataciones, proyectos de infraestructura y obras públicas.
                          Árbitro en nóminas nacionales e internacionales.
                        </DialogDescription>
                      </DialogHeader>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                        <div className="space-y-3">
                          <img
                            src="/fotopasaporte.jpg"
                            alt="Kevin Pelaez Cruzado"
                            className="w-40 h-auto rounded-md shadow-md object-cover"
                          />
                          <div className="text-sm text-muted-foreground">
                            Catedrático de la Facultad de Derecho y Ciencias Políticas de la Universidad Privada Antenor Orrego. Maestrías en Arbitraje y Mediación
                            (Universidad de Salamanca) y Gestión Pública.
                          </div>
                        </div>

                        <div className="space-y-3">
                          <h4 className="font-medium">Experiencia</h4>
                          <ul className="list-disc list-inside text-sm text-muted-foreground">
                            <li>Asesoría en contrataciones públicas y procesos de licitación.</li>
                            <li>Representación en arbitrajes y resolución de conflictos.</li>
                            <li>Elaboración de contratos y due diligence.</li>
                          </ul>

                          <h4 className="font-medium mt-2">CV Resumido</h4>
                          <div className="text-sm flex flex-col gap-2">
                            <a
                              href="/CV Kevin Pelaez Cruzado 28-08-2025 Resumido.pdf"
                              download="CV_Kevin_Pelaez_Resumido.pdf"
                              className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-background/60 border border-border hover:bg-muted-foreground/10 transition-all duration-150 w-max"
                            >
                              Descargar CV (PDF)
                            </a>
                            <div className="text-muted-foreground">La Libertad, Trujillo - Perú</div>
                          </div>
                        </div>
                      </div>

                      <DialogFooter>
                        <DialogClose className="px-4 py-2 rounded bg-muted-foreground/10 hover:bg-muted-foreground/20">
                          Cerrar
                        </DialogClose>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                  <p></p>
                  <div className="text-muted-foreground">
                    <div className="text-md text-foreground font-mono">Contáctame:</div>

                    <Link href="mailto:k.pelaez_c@hotmail.com" className="underline hover:text-foreground transition-colors duration-300">
                      <span className="text-base sm:text-sm">k.pelaez_c@hotmail.com</span>
                    </Link>
                  </div>
                  <div className="text-xs text-muted-foreground">2012 — Actualidad</div>
                </div>
              </div>
              {/**
              <div className="space-y-4">
                <div className="text-sm text-muted-foreground font-mono">Habilidades</div>
                <div className="flex flex-wrap gap-2">
                  {["H1", "H2", "H3", "H4", "H5"].map((skill) => (
                    <span
                      key={skill}
                      className="px-3 py-1 text-xs border border-border rounded-full hover:border-muted-foreground/50 transition-colors duration-300"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>**/}
            </div>
          </div>
        </header>

        <section
          id="work"
          ref={(el) => {
            sectionsRef.current[1] = el
          }}
          className="min-h-screen py-12 sm:py-20 opacity-0"
        >
          <div className="space-y-10 sm:space-y-12">
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
              <h2 className="text-3xl sm:text-4xl font-light">Información Basica</h2>
              <div className="text-sm font-mono">2012 — 2025</div>
            </div>

            {/* Row 1: Text left, Image right */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div className="anim-item" data-anim="left">
                <h3 className="text-xl font-medium">Abogado - Experiencia profesional</h3>
                <p className="mt-4 text-muted-foreground leading-relaxed">
                  Profesional del derecho con amplia experiencia en arbitraje, contrataciones públicas y asesoría legal para
                  instituciones públicas y privadas. Ofrezco servicios de consultoría, representación y capacitación en temas
                  de derecho administrativo, contratos y resolución de conflictos.
                </p>
                <p className="mt-4 text-muted-foreground leading-relaxed">
                  Trabajo enfocado en resultados, cumplimiento normativo y protección de derechos. Experiencia en
                  elaboración de informes periciales, defensa en procesos administrativos y asesoramiento en licitaciones.
                </p>
              </div>

              <div className="flex justify-center lg:justify-end anim-item" data-anim="right">
                <img
                  src="/Abogado.jpg"
                  alt="Abogado"
                  className="w-48 sm:w-56 md:w-64 lg:w-72 xl:w-80 h-auto rounded-md shadow-md object-cover"
                />
              </div>
            </div>

            {/* Row 2: Content then Image on mobile; Image left on lg */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div className="lg:order-2 anim-item" data-anim="right">
                <h3 className="text-xl font-medium">Servicios y áreas de práctica</h3>
                <p className="mt-4 text-muted-foreground leading-relaxed">
                  - Asesoría en contrataciones públicas y procesos de licitación.
                </p>
                <p className="mt-2 text-muted-foreground leading-relaxed">
                  - Representación en arbitrajes y resolución de conflictos.
                </p>
                <p className="mt-2 text-muted-foreground leading-relaxed">
                  - Elaboración de contratos, due diligence y opinión legal.
                </p>
              </div>

              <div className="flex justify-center lg:justify-start lg:order-1 anim-item" data-anim="left">
                <img
                  src="abogado2.jpg"
                  alt="Trabajo jurídico"
                  className="w-48 sm:w-56 md:w-64 lg:w-72 xl:w-80 h-auto rounded-md shadow-md object-cover"
                />
              </div>
            </div>

            {/* Additional Rows: supervision, debate, documentacion */}

            {/* Row 3: Text left, Image right (Supervisión) */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div className="anim-item" data-anim="left">
                <h3 className="text-xl font-medium">Supervisión de Expedientes</h3>
                <p className="mt-4 text-muted-foreground leading-relaxed">
                  Coordinación y supervisión de procesos administrativos y expedientes técnicos, con seguimiento a
                  cumplimiento de plazos y requerimientos formales.
                </p>
              </div>

              <div className="flex justify-center lg:justify-end anim-item" data-anim="right">
                <img
                  src="/supervisionmaqueta.png"
                  alt="Supervisión"
                  className="w-44 sm:w-56 md:w-64 lg:w-72 xl:w-80 h-auto rounded-md shadow-md object-cover"
                />
              </div>
            </div>

            {/* Row 4: Content then Image on mobile; Image left on lg */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div className="lg:order-2 anim-item" data-anim="right">
                <h3 className="text-xl font-medium">Debate y Capacitación</h3>
                <p className="mt-4 text-muted-foreground leading-relaxed">
                  Facilitación de debates públicos y talleres de capacitación para equipos legales y administrativos,
                  orientados a mejorar políticas y procesos internos.
                </p>
              </div>

              <div className="flex justify-center lg:justify-start lg:order-1 anim-item" data-anim="left">
                <img
                  src="/debatemaqueta.png"
                  alt="Debate"
                  className="w-44 sm:w-56 md:w-64 lg:w-72 xl:w-80 h-auto rounded-md shadow-md object-cover"
                />
              </div>
            </div>

            {/* Row 5: Text left, Image right (Documentación) */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div className="anim-item" data-anim="left">
                <h3 className="text-xl font-medium">Documentación y Tramitación</h3>
                <p className="mt-4 text-muted-foreground leading-relaxed">
                  Preparación, revisión y tramitación de documentación técnica y legal, asegurando consistencia y
                  cumplimiento de requisitos formales para su presentación ante entidades públicas.
                </p>
              </div>

              <div className="flex justify-center lg:justify-end anim-item" data-anim="right">
                <img
                  src="/documentacionmaqueta.png"
                  alt="Documentación"
                  className="w-44 sm:w-56 md:w-64 lg:w-72 xl:w-80 h-auto rounded-md shadow-md object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        <section
          id="thoughts"
          ref={(el) => {
            sectionsRef.current[2] = el
          }}
          className="min-h-screen py-20 sm:py-32 opacity-0"
        >
          <div className="space-y-12 sm:space-y-16">
            <h2 className="text-3xl sm:text-4xl font-light anim-item" data-anim="left">Estudios Recientes</h2>

            <div className="grid gap-6 sm:gap-8 lg:grid-cols-2">
              {[
                {
                  title: "FUTURO EN",
                  excerpt: "desc. completa",
                  date: "Dic 2024",
                  readTime: "5 min",
                },
                {
                  title: "DERECHO DE",
                  excerpt: "desc. completa",
                  date: "Nov 2024",
                  readTime: "8 min",
                },
                {
                  title: "GRAN",
                  excerpt: "desc. completa",
                  date: "Oct 2024",
                  readTime: "6 min",
                },
                {
                  title: "Hola HOLA hoka AAA",
                  excerpt: "desc. completa",
                  date: "Sep 2024",
                  readTime: "4 min",
                },
              ].map((post, index) => (
                <article
                  key={index}
                  className="group p-6 sm:p-8 border border-border rounded-lg hover:border-muted-foreground/50 transition-all duration-500 hover:shadow-lg cursor-pointer anim-item"
                  data-anim={index % 2 === 0 ? "left" : "right"}
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between text-xs text-muted-foreground font-mono">
                      <span>{post.date}</span>
                      <span>{post.readTime}</span>
                    </div>

                    <h3 className="text-lg sm:text-xl font-medium group-hover:text-muted-foreground transition-colors duration-300">
                      {post.title}
                    </h3>

                    <p className="text-muted-foreground leading-relaxed">{post.excerpt}</p>

                    <div className="flex items-center gap-2 text-sm text-muted-foreground group-hover:text-foreground transition-colors duration-300">
                      <span>Leer más</span>
                      <svg
                        className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17 8l4 4m0 0l-4 4m4-4H3"
                        />
                      </svg>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section
          id="connect"
          ref={(el) => {
            sectionsRef.current[3] = el
          }}
          className="py-20 sm:py-32 opacity-0"
        >
            <div className="grid lg:grid-cols-2 gap-12 sm:gap-16">
            <div className="space-y-6 sm:space-y-8">
              <h2 className="text-3xl sm:text-4xl font-light anim-item" data-anim="left">Contáctame</h2>

              <div className="space-y-6 anim-item" data-anim="left">
                <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed">
                  Atento a cualquier oportunidad, colaboración o conversación en derecho.
                </p>

                <div className="space-y-4">
                  <Link
                    href="mailto:k.pelaez_c@hotmail.com"
                    className="group flex items-center gap-3 text-foreground hover:text-muted-foreground transition-colors duration-300 anim-item"
                  >
                    <span className="text-base sm:text-lg">k.pelaez_c@hotmail.com</span>
                    <svg
                      className="w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-300"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>

            <div className="space-y-6 sm:space-y-8">
              <div className="text-sm text-foreground font-mono anim-item" data-anim="left">Redes Sociales</div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { name: "Número de contacto", handle: "+51 922 863 714", url: "https://wa.me/51922863714" },
                  { name: "LinkedIn", handle: "Kevin Pelaez Cruzado", url: "https://www.linkedin.com/in/kevin-pelaez-cruzado-b370b2a1/" },
                ].map((social, idx) => (
                  <Link
                    key={social.name}
                    href={social.url}
                    className="group p-4 border border-border rounded-lg hover:border-muted-foreground/50 transition-all duration-300 hover:shadow-sm anim-item"
                    data-anim={idx % 2 === 0 ? "left" : "right"}
                  >
                    <div className="space-y-2">
                      <div className="text-foreground group-hover:text-muted-foreground transition-colors duration-300">
                        {social.name}
                      </div>
                      <div className="text-sm text-muted-foreground">{social.handle}</div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>

        <footer className="py-12 sm:py-16 border-t border-border">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 sm:gap-8">
            <div className="space-y-2">
              <div className="text-sm text-muted-foreground">© 2025 Kevin Pelaez Cruzado. Todos los derechos reservados.</div>
            </div>

            <div className="flex items-center gap-4">
              <button className="group p-3 rounded-lg border border-border hover:border-muted-foreground/50 transition-all duration-300">
                <svg
                  className="w-4 h-4 text-muted-foreground group-hover:text-foreground transition-colors duration-300"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                  />
                </svg>
              </button>
            </div>
          </div>
        </footer>
        </div>
      </main>

      <div className="fixed bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background via-background/80 to-transparent pointer-events-none"></div>
    </div>
  )
}
