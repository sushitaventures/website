import { useRef } from "react";
import { Link } from "react-router-dom";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./ServicesScrollGrid.css";

gsap.registerPlugin(ScrollTrigger);

const SERVICES = [
  {
    title: "Hotel & Resorts",
    slug: "hotel-resorts",
    img: "service-hotel-resorts",
    area: "center",
  },
  { title: "Leasing", slug: "leasing", img: "service-leasing", area: "tl" },
  {
    title: "Residential Property",
    slug: "residential-property",
    img: "service-residential",
    area: "bl",
  },
  {
    title: "Commercial Property",
    slug: "commercial-property",
    img: "service-commercial",
    area: "tr",
  },
  {
    title: "Industrial Property",
    slug: "industrial-property",
    img: "service-industrial",
    area: "br",
  },
];

export const ServicesScrollGrid = () => {
  const rootRef = useRef(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(
        "(min-width: 901px) and (prefers-reduced-motion: no-preference)",
        () => {
          const section = rootRef.current;
          const center = section.querySelector(".ssg-card--center");

          gsap
            .timeline({
              scrollTrigger: {
                trigger: section,
                start: "top top",
                end: "+=150%",
                pin: true,
                scrub: 1,
                invalidateOnRefresh: true,
              },
            })
            // Main image starts covering the whole viewport (centred on it), then settles into its grid cell.
            // offsetLeft/Top ignore transforms, so these stay correct on refresh.
            .from(center, {
              x: () => section.clientWidth / 2 - (center.offsetLeft + center.offsetWidth / 2),
              y: () => section.clientHeight / 2 - (center.offsetTop + center.offsetHeight / 2),
              scale: () =>
                1.02 *
                Math.max(
                  section.clientWidth / center.offsetWidth,
                  section.clientHeight / center.offsetHeight,
                ),
              borderRadius: 0,
              ease: "none",
            })
            .from(
              ".ssg-card--side",
              { opacity: 0, scale: 0.85, stagger: 0.08, ease: "power2.out" },
              0.35,
            )
            .from(".ssg-header > *", { opacity: 0, y: 20, stagger: 0.08 }, 0.55)
            .from(".ssg-title", { opacity: 0, y: 16, stagger: 0.05 }, 0.7);
        },
      );
      return () => mm.revert();
    },
    { scope: rootRef },
  );

  return (
    <section
      id="services-section"
      ref={rootRef}
      className="ssg"
      aria-label="Sushita Ventures Specialist Services"
    >
      <header className="ssg-header">
        <h2 className="ssg-heading">Our Areas of Expertise</h2>
        <p className="ssg-sub">
          Hospitality, leasing, residential, commercial and industrial property — one considered perspective.
        </p>
      </header>

      <div className="ssg-grid m-swipe">
        {SERVICES.map((s) => (
          <Link
            key={s.slug}
            to={`/services/${s.slug}`}
            className={`ssg-card ssg-card--${s.area === "center" ? "center" : "side"} ssg-${s.area}`}
          >
            <picture>
              <source srcSet={`/images/home/${s.img}.webp`} type="image/webp" />
              <img src={`/images/home/${s.img}.jpg`} alt={s.title} className="ssg-img" />
            </picture>
            <h3 className="ssg-title">{s.title}</h3>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default ServicesScrollGrid;
