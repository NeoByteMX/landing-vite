import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'motion/react';
import {
  Menu,
  X,
  AlertCircle,
  Cloud,
  Server,
  ShieldCheck,
  Terminal,
  Activity,
  Cpu,
  GitBranch,
  DollarSign,
  ArrowRight,
  CheckCircle2,
  Sliders,
  Layers,
  Lock,
  Zap,
  Globe,
  Clock,
  ExternalLink,
  ChevronRight,
  Sparkles,
  Award,
  UserCheck,
  Briefcase,
  FileCheck,
  Building2,
  Calendar,
} from 'lucide-react';

const CLOUD_JELLYFISH_HERO_IMAGE = '/cloud_jellyfish.jpg';

// Fondo cinemático interactivo con 'cloud_jellyfish.jpg' animado:
// Combina derivas multicapa orgánicas, respiración de medusa/nube, ondas bioluminiscentes y esporas etéreas
interface AnimatedCloudJellyfishBackgroundProps {
  prefersReducedMotion: boolean;
  heroRef: React.RefObject<HTMLElement | null>;
}

function AnimatedCloudJellyfishBackground({
  prefersReducedMotion,
  heroRef,
}: AnimatedCloudJellyfishBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const mouseRef = useRef({ x: 0.5, y: 0.5, targetX: 0.5, targetY: 0.5 });

  // Seguimiento suave del cursor para interacción de marea y viento
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.targetX = e.clientX / window.innerWidth;
      mouseRef.current.targetY = e.clientY / window.innerHeight;
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Animación continua de bioluminiscencia, pulsos de medusa y partículas etéreas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let isVisible = true;

    const resize = () => {
      if (!canvas) return;
      canvas.width = canvas.parentElement?.clientWidth || window.innerWidth;
      canvas.height = canvas.parentElement?.clientHeight || window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    // Entidades de esporas bioluminiscentes y polvo de nube
    interface BioluminescentParticle {
      x: number;
      y: number;
      baseX: number;
      radius: number;
      baseAlpha: number;
      speedY: number;
      swayAmp: number;
      swayFreq: number;
      swayPhase: number;
      pulsePhase: number;
      pulseSpeed: number;
      color: string;
      blur: number;
    }

    // Ondas y pulsos orgánicos que imitan la natación de medusas en la nube
    interface JellyfishPulseRing {
      relX: number;
      relY: number;
      radius: number;
      maxRadius: number;
      speed: number;
      alpha: number;
      color: string;
    }

    const particles: BioluminescentParticle[] = [];
    const colors = [
      'rgba(56, 189, 248,',  // Cyan celeste
      'rgba(96, 165, 250,',  // Azul cielo
      'rgba(45, 212, 191,',  // Turquesa bioluminiscente
      'rgba(255, 255, 255,', // Blanco perla
      'rgba(167, 139, 250,', // Violeta etéreo tenue
    ];

    for (let i = 0; i < 50; i++) {
      const x = Math.random() * canvas.width;
      particles.push({
        x,
        baseX: x,
        y: Math.random() * canvas.height,
        radius: Math.random() * 2.6 + 0.8,
        baseAlpha: Math.random() * 0.45 + 0.25,
        speedY: Math.random() * 0.45 + 0.2,
        swayAmp: Math.random() * 35 + 15,
        swayFreq: Math.random() * 0.008 + 0.004,
        swayPhase: Math.random() * Math.PI * 2,
        pulsePhase: Math.random() * Math.PI * 2,
        pulseSpeed: Math.random() * 0.03 + 0.015,
        color: colors[Math.floor(Math.random() * colors.length)],
        blur: Math.random() > 0.5 ? Math.random() * 8 + 4 : 0,
      });
    }

    const pulseRings: JellyfishPulseRing[] = [
      { relX: 0.38, relY: 0.42, radius: 20, maxRadius: 280, speed: 0.65, alpha: 0.4, color: '56, 189, 248' },
      { relX: 0.68, relY: 0.35, radius: 80, maxRadius: 320, speed: 0.55, alpha: 0.35, color: '45, 212, 191' },
      { relX: 0.52, relY: 0.62, radius: 140, maxRadius: 300, speed: 0.75, alpha: 0.3, color: '147, 197, 253' },
    ];

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          isVisible = entry.isIntersecting;
        });
      },
      { threshold: 0.05 }
    );

    if (heroRef.current) {
      observer.observe(heroRef.current);
    }

    let time = 0;

    const render = () => {
      animationFrameId = requestAnimationFrame(render);
      if (!isVisible || prefersReducedMotion) return;

      time += 0.016;

      // Inercia suave del ratón
      mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * 0.035;
      mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * 0.035;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // 1. Dibujar y expandir pulsos de luz de las medusas en la nube
      for (const ring of pulseRings) {
        ring.radius += ring.speed;
        if (ring.radius > ring.maxRadius) {
          ring.radius = 15;
        }

        const progress = ring.radius / ring.maxRadius;
        const currentAlpha = Math.sin(progress * Math.PI) * ring.alpha;
        const centerX = ring.relX * canvas.width + (mouseRef.current.x - 0.5) * 40;
        const centerY = ring.relY * canvas.height + (mouseRef.current.y - 0.5) * 30;

        const grad = ctx.createRadialGradient(
          centerX,
          centerY,
          Math.max(0, ring.radius * 0.2),
          centerX,
          centerY,
          ring.radius
        );
        grad.addColorStop(0, `rgba(${ring.color}, ${currentAlpha * 0.8})`);
        grad.addColorStop(0.5, `rgba(${ring.color}, ${currentAlpha * 0.35})`);
        grad.addColorStop(1, `rgba(${ring.color}, 0)`);

        ctx.save();
        ctx.beginPath();
        ctx.arc(centerX, centerY, ring.radius, 0, Math.PI * 2);
        ctx.fillStyle = grad;
        ctx.fill();
        ctx.restore();
      }

      // 2. Dibujar esporas y partículas flotantes
      for (const p of particles) {
        p.y -= p.speedY;
        p.swayPhase += p.swayFreq;
        p.pulsePhase += p.pulseSpeed;

        // Reiniciar cuando salgan arriba
        if (p.y < -20) {
          p.y = canvas.height + 20;
          p.baseX = Math.random() * canvas.width;
        }

        const sway = Math.sin(p.swayPhase) * p.swayAmp;
        const mouseShiftX = (mouseRef.current.x - 0.5) * 35;
        const mouseShiftY = (mouseRef.current.y - 0.5) * 20;
        const drawX = p.baseX + sway + mouseShiftX;
        const drawY = p.y + mouseShiftY;

        const pulse = (Math.sin(p.pulsePhase) + 1) * 0.5;
        const currentAlpha = p.baseAlpha * (0.6 + 0.4 * pulse);

        ctx.save();
        ctx.beginPath();
        ctx.arc(drawX, drawY, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `${p.color} ${currentAlpha})`;
        if (p.blur > 0) {
          ctx.shadowBlur = p.blur;
          ctx.shadowColor = `${p.color} 0.8)`;
        }
        ctx.fill();
        ctx.restore();
      }
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', resize);
      observer.disconnect();
    };
  }, [prefersReducedMotion, heroRef]);

  return (
    <section
      ref={heroRef}
      aria-label="Fondo cinemático animado con cloud_jellyfish.jpg"
      className="absolute inset-0 z-0 h-full w-full overflow-hidden pointer-events-none"
    >
      {/* Capa Principal: cloud_jellyfish.jpg con respiración y deriva cinemática continua */}
      <motion.div
        animate={
          prefersReducedMotion
            ? undefined
            : {
                scale: [1.02, 1.10, 1.05, 1.02],
                x: [-16, 20, -10, -16],
                y: [-12, 16, -6, -12],
              }
        }
        transition={{
          duration: 24,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="absolute inset-0 h-full w-full will-change-transform"
      >
        <img
          src={CLOUD_JELLYFISH_HERO_IMAGE}
          alt="Medusas flotantes en forma de nubes bioluminiscentes cósmicas"
          className="h-full w-full object-cover object-center scale-110"
        />
      </motion.div>

      {/* Capa Secundaria: Difracción y refracción luminosa (paralaje y brillo bioluminiscente en contra-fase) */}
      <motion.div
        animate={
          prefersReducedMotion
            ? undefined
            : {
                scale: [1.06, 1.01, 1.08, 1.06],
                x: [18, -14, 12, 18],
                y: [12, -14, 8, 12],
                opacity: [0.25, 0.45, 0.3, 0.25],
              }
        }
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="absolute inset-0 h-full w-full mix-blend-screen will-change-transform"
      >
        <img
          src={CLOUD_JELLYFISH_HERO_IMAGE}
          alt=""
          aria-hidden="true"
          className="h-full w-full object-cover object-center scale-110 blur-[1.5px]"
        />
      </motion.div>

      {/* Capa Animada en Vivo: Ondas de natación de medusas, caústicas y esporas de vapor */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 h-full w-full pointer-events-none mix-blend-screen opacity-90"
      />

      {/* Matriz técnica de cuadrícula sutil (identidad Cloud / DevSecOps) */}
      <div
        className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff06_1px,transparent_1px),linear-gradient(to_bottom,#ffffff06_1px,transparent_1px)] bg-[size:3.5rem_3.5rem] pointer-events-none"
        aria-hidden="true"
      />

      {/* Velo de viñeta para garantizar legibilidad WCAG AA en textos y botones */}
      <div
        className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-black/35 pointer-events-none"
        aria-hidden="true"
      />
    </section>
  );
}

// Technical Insights & Architecture Notes
interface Article {
  id: string;
  category: 'Kubernetes' | 'Seguridad Cloud' | 'FinOps';
  title: string;
  date: string;
  readTime: string;
  summary: string;
  problem: string;
  solution: string;
  keyPoints: string[];
  codeSnippet?: {
    title: string;
    code: string;
  };
}

const TECHNICAL_ARTICLES: Article[] = [
  {
    id: 'k8s-hardening',
    category: 'Kubernetes',
    title: 'Hardening de Kubernetes en Producción: Del CIS Benchmark al Kernel eBPF',
    date: '18 Mar 2026',
    readTime: '6 min de lectura',
    summary:
      'Guía técnica para eliminar permisos root, restringir llamadas al kernel con Cilium y hacer cumplir políticas de admisión con Kyverno sin romper despliegues existentes.',
    problem:
      'Más del 70% de los clusters de Kubernetes en producción ejecutan contenedores con capacidades root innecesarias y puertos host expuestos, dejando la puerta abierta a escapes de contenedor.',
    solution:
      'Implementación de un enfoque multicapa: políticas declarativas Kyverno en modo Enforce, aislamiento de red con mTLS por hardware eBPF con Cilium y perfiles Seccomp estrictos.',
    keyPoints: [
      'Prohibición de privilegios root y sistemas de archivos raíz escribibles',
      'Filtrado de llamadas al sistema (syscalls) sospechosas en tiempo real con Falco',
      'Aislamiento de red pod-a-pod cifrado automáticamente sin overhead de proxies',
      'Auditoría continua de cumplimiento frente al CIS Kubernetes Benchmark v1.8',
    ],
    codeSnippet: {
      title: 'kyverno-disallow-privileged.yaml',
      code: `apiVersion: kyverno.io/v1
kind: ClusterPolicy
metadata:
  name: disallow-privileged-containers
spec:
  validationFailureAction: Enforce
  rules:
    - name: privilege-escalation-not-allowed
      match:
        resources:
          kinds:
            - Pod
      validate:
        message: "La elevación de privilegios no está permitida en este cluster."
        pattern:
          spec:
            containers:
              - securityContext:
                  allowPrivilegeEscalation: false
                  readOnlyRootFilesystem: true`,
    },
  },
  {
    id: 'aws-zerotrust',
    category: 'Seguridad Cloud',
    title: 'Zero-Trust en AWS: Eliminando credenciales estáticas con IRSA y Vault',
    date: '12 Mar 2026',
    readTime: '5 min de lectura',
    summary:
      'Cómo erradicar las claves IAM permanentes de desarrolladores y canalizaciones CI/CD, reemplazándolas con autenticación federada OIDC y secretos efímeros en memoria.',
    problem:
      'Las credenciales de larga duración (AWS_ACCESS_KEY_ID y SECRET_ACCESS_KEY) son el vector #1 de filtración en repositorios Git y workstations comprometidas.',
    solution:
      'Migración total a IAM Roles for Service Accounts (IRSA) en EKS y autenticación OIDC directa en GitHub Actions, combinada con HashiCorp Vault para secretos dinámicos con TTL de minutos.',
    keyPoints: [
      'Cero credenciales persistentes almacenadas en servidores o secretos de GitHub',
      'Emisión de tokens temporales de AWS STS con expiración estricta de 15 minutos',
      'Rotación automatizada de contraseñas de bases de datos gestionada por Vault',
      'Trazabilidad forense completa de accesos registrada en AWS CloudTrail',
    ],
    codeSnippet: {
      title: 'github-actions-oidc.yaml',
      code: `# Autenticación sin credenciales estáticas vía OIDC
jobs:
  deploy:
    runs-on: ubuntu-latest
    permissions:
      id-token: write
      contents: read
    steps:
      - name: Asumir rol IAM en AWS
        uses: aws-actions/configure-aws-credentials@v4
        with:
          role-to-assume: arn:aws:iam::123456789012:role/github-deployer
          aws-region: us-east-1
          audience: sts.amazonaws.com`,
    },
  },
  {
    id: 'karpenter-spot',
    category: 'FinOps',
    title: 'Estrategia Spot y Karpenter: Cómo recortamos un 48% en cómputo EKS sin caídas',
    date: '04 Mar 2026',
    readTime: '7 min de lectura',
    summary:
      'Reglas de orquestación de capacidad para combinar instancias On-Demand para componentes stateful con flotas Spot dinámicas aprovisionadas en milisegundos.',
    problem:
      'El Cluster Autoscaler tradicional de Kubernetes es lento (3 a 5 minutos por nodo) y los equipos temen a las instancias Spot por riesgo a interrupciones bruscas de 2 minutos.',
    solution:
      'Uso de Karpenter configurado con múltiples familias de instancias equivalentes y escucha activa de avisos de interrupción de AWS EventBridge para drenar pods con gracia.',
    keyPoints: [
      'Aprovisionamiento Just-in-Time de nodos en menos de 45 segundos',
      'Diversificación automática entre más de 12 tipos de instancia EC2 por nodo',
      'Manejo elegante de terminaciones con Node Termination Handler y PDBs',
      'Ahorro comprobado del 48% en la factura mensual de cómputo en AWS',
    ],
    codeSnippet: {
      title: 'karpenter-nodepool.yaml',
      code: `apiVersion: karpenter.sh/v1beta1
kind: NodePool
metadata:
  name: stateless-spot-workers
spec:
  template:
    spec:
      requirements:
        - key: "karpenter.sh/capacity-type"
          operator: In
          values: ["spot"]
        - key: "kubernetes.io/arch"
          operator: In
          values: ["arm64", "amd64"]
        - key: "karpenter.k8s.aws/instance-category"
          operator: In
          values: ["c", "m", "r"]
      expireAfter: 720h`,
    },
  },
  {
    id: 'supply-chain-security',
    category: 'Seguridad Cloud',
    title: 'Firma Criptográfica en la Cadena de Suministro con Cosign y Sigstore',
    date: '25 Feb 2026',
    readTime: '4 min de lectura',
    summary:
      'Verificación de imágenes OCI antes de que toquen el cluster de producción. Bloqueo automático de imágenes que no pasaron los escaneos SAST/DAST en GitHub Actions.',
    problem:
      'Cualquier usuario con acceso a un registro de contenedores puede subir una imagen maliciosa o no verificada si el cluster no valida su firma digital en tiempo de admisión.',
    solution:
      'Firma sin claves permanentes con Sigstore Cosign ligada a la identidad del pipeline, y validación en el cluster mediante controladores de admisión Kyverno.',
    keyPoints: [
      'Garantía matemática de que la imagen desplegada proviene exactamente de tu pipeline',
      'Generación de SBOM (Software Bill of Materials) en formato SPDX/CycloneDX',
      'Bloqueo preventivo en el cluster si la firma o el atestado de seguridad fallan',
      'Cumplimiento con requisitos de cadena de suministro SLSA Nivel 3',
    ],
  },
  {
    id: 'keda-event-scaling',
    category: 'Kubernetes',
    title: 'Autoscaling Guiado por Eventos: Reemplazando HPA con KEDA',
    date: '17 Feb 2026',
    readTime: '5 min de lectura',
    summary:
      'Por qué escalar por uso de CPU llega tarde para absorber picos y cómo anticiparse escalando según colas Kafka, SQS y conexiones HTTP concurrentes.',
    problem:
      'Cuando el uso de CPU de un pod supera el 80%, las peticiones ya están acumulando latencia o fallando con timeout mientras Kubernetes espera que los nuevos pods arranquen.',
    solution:
      'Integración de KEDA para leer métricas directamente desde los brokers de mensajería (longitud de cola) o balanceadores de carga, escalando de 0 a 50 réplicas antes de saturar.',
    keyPoints: [
      'Escalado a cero (Scale-to-Zero) para microservicios de procesamiento batch',
      'Reacción inmediata basada en peticiones pendientes en lugar de saturación de CPU',
      'Compatibilidad nativa con Prometheus, RabbitMQ, Kafka y colas AWS SQS',
      'Estabilidad garantizada en picos súbitos de tráfico tipo Black Friday',
    ],
  },
  {
    id: 'cloud-networking-costs',
    category: 'FinOps',
    title: 'El Coste Oculto de la Red Cloud: NAT Gateways, Cross-AZ y VPC Endpoints',
    date: '08 Feb 2026',
    readTime: '6 min de lectura',
    summary:
      'Análisis de por qué el tráfico de red suele representar hasta el 25% de la factura cloud y cómo reducirlo con Gateway Endpoints y topologías zonales.',
    problem:
      'Los cargos por tráfico hacia S3 a través de NAT Gateway ($0.045/GB) y el tráfico inter-zona entre microservicios ($0.01/GB por tramo) inflan silenciosamente miles de dólares.',
    solution:
      'Configuración de S3 y DynamoDB Gateway Endpoints gratuitos en las tablas de ruteo, y afinamiento de topología Kubernetes con topologySpreadConstraints zonales.',
    keyPoints: [
      'Ahorro del 100% en cargos de transferencia hacia almacenamiento S3',
      'Reducción drástica del tráfico Cross-AZ forzando llamadas locales en el mismo AZ',
      'Consolidación de NAT Gateways para entornos de desarrollo y staging',
      'Monitoreo granular con VPC Flow Logs agregados en dashboards de coste',
    ],
  },
];

// Freelance core service offerings with DevSecOps focus
const SERVICES = [
  {
    id: 'cloud-architecture',
    icon: Cloud,
    title: 'Arquitectura Cloud & Migraciones Seguras',
    tagline: 'AWS · Google Cloud · Microsoft Azure',
    description:
      'Diseño e implementación de Landing Zones empresariales con topologías de red seguras, segmentación VPC y migraciones sin tiempo de inactividad diseñadas bajo el marco Well-Architected.',
    features: [
      'Infraestructura como Código (IaC) modular y testeada con Terraform y OpenTofu',
      'Migración de cargas críticas monolíticas a microservicios sin downtime',
      'Diseño de topologías Multi-Región con Disaster Recovery activo-activo',
      'Auditoría y corrección de permisos IAM con principio de mínimo privilegio',
    ],
    metric: '99.999%',
    metricLabel: 'Disponibilidad histórica en producción',
  },
  {
    id: 'kubernetes-platform',
    icon: Server,
    title: 'Kubernetes de Grado Enterprise & Plataformas (IDP)',
    tagline: 'EKS · GKE · AKS · Cilium eBPF',
    description:
      'Orquestación de clusters de Kubernetes autoescalables y blindados. Configuro plataformas internas para que tus desarrolladores desplieguen sin fricción y con seguridad embebida.',
    features: [
      'Autoescalado elástico por eventos y métricas de carga (Karpenter & KEDA)',
      'Service Mesh y seguridad de red de alta velocidad con Cilium (eBPF) e Istio',
      'Políticas de admisión estrictas con Kyverno y OPA Gatekeeper',
      'Entornos de desarrollo efímeros generados automáticamente por PR',
    ],
    metric: '< 40s',
    metricLabel: 'Tiempo de despliegue de entornos efímeros',
  },
  {
    id: 'devsecops-compliance',
    icon: ShieldCheck,
    title: 'DevSecOps, Hardening & Cumplimiento',
    tagline: 'M.Sc. Ciberseguridad · SOC 2 · ISO 27001 · PCI-DSS',
    description:
      'Aplico mi formación de posgrado en ciberseguridad para integrar controles preventivos en tus pipelines y runtime. Tu infraestructura lista para superar auditorías enterprise.',
    features: [
      'Seguridad en la cadena de suministro (SAST, SCA, SBOM y firma con Cosign)',
      'Gestión centralizada de secretos efímeros en memoria con HashiCorp Vault',
      'Escaneo continuo de vulnerabilidades en imágenes y código base con Trivy',
      'Hardening de sistemas operativos y clusters siguiendo estándares CIS Benchmarks',
    ],
    metric: '100%',
    metricLabel: 'Superación en auditorías de seguridad',
  },
  {
    id: 'gitops-cicd',
    icon: GitBranch,
    title: 'GitOps & Automatización CI/CD de Alta Velocidad',
    tagline: 'ArgoCD · GitHub Actions · GitLab CI',
    description:
      'Canalizaciones de entrega continua donde el repositorio Git es la única fuente de verdad. Despliegues determinísticos, repetibles y con reversión instantánea ante cualquier fallo.',
    features: [
      'Estrategias de despliegue canary y blue/green con Argo Rollouts',
      'Validación automatizada de salud con telemetría Prometheus integrada',
      'Optimización de tiempos de compilación y caching distribuido de pipelines',
      'Rollbacks automáticos en milisegundos si la tasa de error supera el umbral',
    ],
    metric: '10x',
    metricLabel: 'Aceleración en ritmo de lanzamientos',
  },
  {
    id: 'finops-optimization',
    icon: DollarSign,
    title: 'FinOps & Reducción de Factura Cloud',
    tagline: 'Auditoría de Costes · Spot Automation · Rightsizing',
    description:
      'Detengo el desperdicio de presupuesto en infraestructura. Identifico recursos sobredimensionados, elimino costes ocultos y configuro automatizaciones para recortar tu factura mensual.',
    features: [
      'Auditoría minuciosa de cómputo, storage tiers, NAT Gateways y bases de datos',
      'Implementación de flotas Spot resilientes para cargas stateless',
      'Asignación transparente de costes por microservicio y equipo de producto',
      'Planificación de compromisos de ahorro (Savings Plans / Reserved Instances)',
    ],
    metric: '-35% a -50%',
    metricLabel: 'Ahorro promedio en gasto cloud mensual',
  },
  {
    id: 'sre-observability',
    icon: Activity,
    title: 'Observabilidad 360°, SRE & Resiliencia',
    tagline: 'OpenTelemetry · Grafana · Datadog · Prometheus',
    description:
      'Visibilidad profunda sobre el comportamiento de tus aplicaciones. Diseñamos alertas con sentido sin fatiga de guardias, definición de SLOs y runbooks de remediación claros.',
    features: [
      'Estandarización de métricas, trazas y logs unificados con OpenTelemetry',
      'Definición de SLIs, SLOs y presupuestos de error (Error Budgets) accionables',
      'Trazabilidad distribuida para detectar cuellos de botella en milisegundos',
      'Preparación para alta concurrencia y pruebas de caos (Chaos Engineering)',
    ],
    metric: '< 5 min',
    metricLabel: 'MTTR promedio en mitigación de incidentes',
  },
];

// Collaboration Formats (How to hire a senior freelance consultant)
const ENGAGEMENT_MODELS = [
  {
    id: 'audit',
    badge: 'Diagnóstico & Estrategia',
    title: 'Auditoría Técnica Express',
    duration: '1 a 2 semanas',
    scope: 'Alcance cerrado (Fixed-price)',
    description:
      'Revisión exhaustiva y forense de tu infraestructura actual en AWS, GCP o Azure. Evaluamos seguridad (CIS Benchmarks), costes FinOps y cuellos de botella en despliegues.',
    deliverables: [
      'Reporte ejecutivo y técnico con matriz de riesgos priorizada',
      'Plan de acción paso a paso para recortar costes y cerrar brechas de seguridad',
      'Sesión de presentación y preguntas con tus líderes técnicos y CTO',
      'Sin acceso a código sensible ni datos de usuarios finales',
    ],
    cta: 'Solicitar auditoría express',
    idealFor: 'Startups y empresas que sospechan que pagan de más o tienen dudas de seguridad.',
  },
  {
    id: 'project',
    badge: 'Implementación Llave en Mano',
    title: 'Modernización & Migración Cloud',
    duration: '4 a 8 semanas',
    scope: 'Por proyecto o hitos',
    description:
      'Ejecución directa de una transformación técnica: migración a Kubernetes, adopción de GitOps, creación de Landing Zones con Terraform o certificación de seguridad SOC2.',
    deliverables: [
      'Infraestructura 100% como código (IaC) modular y documentada',
      'Pipelines CI/CD automatizados y blindados con pruebas de seguridad',
      'Migración de tráfico en producción sin corte de servicio',
      'Capacitación técnica y transferencia total de conocimiento a tu equipo interno',
    ],
    cta: 'Planificar proyecto',
    idealFor: 'Equipos que necesitan escalar o modernizarse sin contratar una plantilla fija.',
  },
  {
    id: 'fractional',
    badge: 'Acompañamiento Continuo',
    title: 'Fractional Lead DevOps & Security',
    duration: 'Mensual recurrente (Retainer)',
    scope: 'Horas dedicadas / semana',
    description:
      'Actúo como tu líder senior de infraestructura y ciberseguridad bajo demanda. Acompañamiento estratégico a nivel Staff Engineer para guiar a tu equipo y resolver problemas complejos.',
    deliverables: [
      'Horas semanales de arquitectura hands-on y revisión de PRs complejas',
      'Soporte prioritario ante incidencias críticas de infraestructura',
      'Sesiones de mentoría y diseño con tus ingenieros de software',
      'Optimización mensual continua de costes y postura de seguridad',
    ],
    cta: 'Consultar disponibilidad',
    idealFor: 'CTOs y directores de ingeniería que quieren experiencia de nivel Staff sin coste de nómina fija.',
  },
];

// Interactive Architecture Blueprint Data
const BLUEPRINTS = {
  gitops: {
    title: 'Canalización GitOps & Despliegues Progresivos Canarios',
    subtitle: 'Flujo declarativo de código a producción con rollback automático',
    steps: [
      { name: 'Git Commit & PR', desc: 'El desarrollador envía cambios; se genera automáticamente un entorno efímero en K8s para testing.' },
      { name: 'Análisis SAST & Escaneo', desc: 'Validación estática de código, escaneo de dependencias y análisis de vulnerabilidades OCI con Trivy.' },
      { name: 'Firma Criptográfica', desc: 'Construcción reproducible de imagen OCI firmada con Sigstore / Cosign para garantizar procedencia.' },
      { name: 'Sincronización ArgoCD', desc: 'El operador GitOps detecta el commit firmado y reconcilia el estado deseado en el cluster.' },
      { name: 'Canary Rollout & Métricas', desc: 'Tráfico enrutado 10% -> 50% -> 100% verificando tasas de error HTTP en tiempo real con Prometheus.' },
    ],
    code: `# Pipeline de Despliegue Progresivo Argo Rollouts
apiVersion: argoproj.io/v1alpha1
kind: Rollout
metadata:
  name: payment-gateway-api
spec:
  replicas: 12
  strategy:
    canary:
      analysis:
        templates:
          - templateName: http-error-rate-check
        args:
          - name: service-name
            value: payment-gateway
      steps:
        - setWeight: 10
        - pause: { duration: 5m }
        - setWeight: 50
        - pause: { duration: 10m }`,
  },
  kubernetes: {
    title: 'Topología Kubernetes Multi-AZ con Autoscaling Elástico',
    subtitle: 'Aislamiento de red con Cilium eBPF, Karpenter y almacenamiento cifrado',
    steps: [
      { name: 'Perímetro WAF & Cloudflare', desc: 'Terminación TLS segura, mitigación DDoS y protección de endpoints API.' },
      { name: 'Cilium eBPF Mesh', desc: 'Comunicación cifrada mTLS nativa en el kernel de Linux sin sobrecarga de proxies.' },
      { name: 'KEDA Event Autoscaler', desc: 'Escalado reactivo de pods según colas de mensajería (SQS / Kafka) y volumen de peticiones.' },
      { name: 'Karpenter Node Provisioner', desc: 'Aprovisionamiento instantáneo de nodos Spot y On-Demand minimizando costes de cómputo.' },
      { name: 'Bases de Datos Multi-Región', desc: 'Almacenamiento cifrado con KMS, réplicas de lectura y failover de alta disponibilidad.' },
    ],
    code: `# Autoescalado KEDA por métrica de mensajes en cola
apiVersion: keda.sh/v1alpha1
kind: ScaledObject
metadata:
  name: transaction-worker-scaler
spec:
  scaleTargetRef:
    name: transaction-worker
  minReplicaCount: 3
  maxReplicaCount: 48
  triggers:
    - type: aws-sqs-queue
      metadata:
        queueURL: https://sqs.us-east-1.amazonaws.com/orders-queue
        queueLength: "25"
        awsRegion: "us-east-1"`,
  },
  security: {
    title: 'Matriz DevSecOps & Zero-Trust en Tiempo de Ejecución',
    subtitle: 'Secretos dinámicos en memoria y políticas estrictas con Kyverno',
    steps: [
      { name: 'IAM sin Claves Estáticas', desc: 'Autenticación federada OIDC para workloads en nube (AWS IRSA / GCP Workload Identity).' },
      { name: 'HashiCorp Vault en Memoria', desc: 'Inyección de credenciales y tokens efímeros que nunca tocan disco ni variables globales.' },
      { name: 'Políticas Kyverno', desc: 'Bloqueo estricto de contenedores con permisos root o capacidades inseguras del kernel.' },
      { name: 'Detección Falco eBPF', desc: 'Monitoreo de comportamiento en tiempo de ejecución para detectar anomalías o shells interactivas.' },
      { name: 'Evidencia Continua de Compliance', desc: 'Recolección automática de logs inmutables para certificaciones SOC 2 e ISO 27001.' },
    ],
    code: `# Política de Seguridad Kyverno: Prohibir contenedores como Root
apiVersion: kyverno.io/v1
kind: ClusterPolicy
metadata:
  name: enforce-non-root-execution
spec:
  validationFailureAction: Enforce
  rules:
    - name: require-run-as-non-root
      match:
        resources:
          kinds:
            - Pod
      validate:
        message: "Por políticas de seguridad, los contenedores deben ejecutarse sin privilegios root."
        pattern:
          spec:
            securityContext:
              runAsNonRoot: true`,
  },
};

export default function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [auditModalOpen, setAuditModalOpen] = useState(false);
  const [auditSubmitted, setAuditSubmitted] = useState(false);
  const [activeBlueprint, setActiveBlueprint] = useState<'gitops' | 'kubernetes' | 'security'>('gitops');
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [articleFilter, setArticleFilter] = useState<'Todos' | 'Kubernetes' | 'Seguridad Cloud' | 'FinOps'>('Todos');
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  // Form State for Direct Technical Consultation
  const [auditForm, setAuditForm] = useState({
    name: '',
    email: '',
    company: '',
    engagementType: 'Auditoría Técnica Express (1-2 semanas)',
    cloudProvider: 'AWS',
    mainChallenge: 'Optimización de Costos FinOps',
    notes: '',
  });

  // Interactive ROI & Cost-Efficiency Calculator State
  const [monthlySpend, setMonthlySpend] = useState(30000);
  const [teamSize, setTeamSize] = useState(15);
  const [incidentFrequency, setIncidentFrequency] = useState('monthly');

  const heroRef = useRef<HTMLElement | null>(null);
  const heroContainerRef = useRef<HTMLDivElement | null>(null);

  // Scroll-linked opacity for hero content elements
  const { scrollYProgress } = useScroll({
    target: heroContainerRef,
    offset: ['start start', 'end start'],
  });

  const scrollOpacity = useTransform(scrollYProgress, [0, 0.45], [1, 0]);
  const scrollYOffset = useTransform(scrollYProgress, [0, 0.45], [0, -28]);

  // Check prefers-reduced-motion
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handler = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };

    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  // Lock body scroll when mobile menu, audit modal or article modal is open
  useEffect(() => {
    if (mobileMenuOpen || auditModalOpen || selectedArticle) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen, auditModalOpen, selectedArticle]);

  // Handle ESC key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (selectedArticle) setSelectedArticle(null);
        if (mobileMenuOpen) setMobileMenuOpen(false);
        if (auditModalOpen) setAuditModalOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [mobileMenuOpen, auditModalOpen, selectedArticle]);

  // ROI Calculator Calculations
  const estimatedSavingsPercent = 0.40; // 40% average FinOps savings
  const monthlySavings = Math.round(monthlySpend * estimatedSavingsPercent);
  const annualSavings = monthlySavings * 12;
  const hoursPerDevRecovered = incidentFrequency === 'weekly' ? 26 : incidentFrequency === 'monthly' ? 14 : 8;
  const totalDevHoursMonth = teamSize * hoursPerDevRecovered;

  // Filtered technical articles
  const filteredArticles =
    articleFilter === 'Todos'
      ? TECHNICAL_ARTICLES
      : TECHNICAL_ARTICLES.filter((a) => a.category === articleFilter);

  // Stagger animation variant config
  const getRevealTransition = (delaySeconds: number) => ({
    duration: prefersReducedMotion ? 0.01 : 0.8,
    delay: prefersReducedMotion ? 0 : delaySeconds,
    ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
  });

  const getInitialState = () => ({
    opacity: 0,
    y: prefersReducedMotion ? 0 : 28,
  });

  const getAnimateState = () => ({
    opacity: 1,
    y: 0,
  });

  const handleAuditSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setAuditSubmitted(true);
    setTimeout(() => {
      setAuditModalOpen(false);
      setAuditSubmitted(false);
      setAuditForm({
        name: '',
        email: '',
        company: '',
        engagementType: 'Auditoría Técnica Express (1-2 semanas)',
        cloudProvider: 'AWS',
        mainChallenge: 'Optimización de Costos FinOps',
        notes: '',
      });
    }, 3500);
  };

  return (
    <div className="relative w-full bg-black text-white selection:bg-white selection:text-black min-h-screen">
      {/* =========================================================================
          HERO SECTION (White on Black, Cinematic Video, Staggered Reveal, Scroll-Linked Opacity)
         ========================================================================= */}
      <div
        ref={heroContainerRef}
        className="relative min-h-[100svh] min-h-screen w-full flex flex-col justify-between overflow-hidden"
      >
        {/* Fondo cinemático animado con cloud_jellyfish.jpg */}
        <AnimatedCloudJellyfishBackground
          prefersReducedMotion={prefersReducedMotion}
          heroRef={heroRef}
        />

        {/* Header / Top Navigation */}
        <header className="relative z-20 w-full px-6 md:px-12 lg:px-16 pt-6 md:pt-10 lg:pt-12">
          <nav
            className="flex items-center justify-between"
            aria-label="Navegación principal"
          >
            {/* Brand / Freelance Identity */}
            <a
              href="#inicio"
              className="flex items-center gap-3 text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black rounded-[4px]"
            >
              <div className="w-8 h-8 rounded-[8px] bg-white text-black flex items-center justify-center font-[600] text-xs shadow-sm tracking-tight">
                EM
              </div>
              <div>
                <span className="text-xl md:text-2xl font-[600] tracking-tight block leading-none">
                  Edwin Martínez
                </span>
                <span className="text-[11px] font-[300] tracking-wider uppercase text-neutral-400 block mt-1">
                  Cloud &amp; DevSecOps Freelance
                </span>
              </div>
            </a>

            {/* Desktop Navigation Links */}
            <div className="hidden lg:flex items-center space-x-8 text-[15px] font-[300] text-white/80">
              <a
                href="#sobre-mi"
                className="hover:text-white transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white rounded-[4px]"
              >
                Perfil &amp; Credenciales
              </a>
              <a
                href="#formatos"
                className="hover:text-white transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white rounded-[4px]"
              >
                Formatos de Trabajo
              </a>
              <a
                href="#servicios"
                className="hover:text-white transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white rounded-[4px]"
              >
                Servicios Técnicos
              </a>
              <a
                href="#arquitectura"
                className="hover:text-white transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white rounded-[4px]"
              >
                Blueprints
              </a>
              <a
                href="#insights"
                className="hover:text-white transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white rounded-[4px]"
              >
                Insights
              </a>
              <a
                href="#calculadora"
                className="hover:text-white transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white rounded-[4px]"
              >
                Calculadora ROI
              </a>
            </div>

            {/* Desktop Call to Action Button */}
            <div className="hidden sm:flex items-center gap-4">
              <button
                type="button"
                onClick={() => setAuditModalOpen(true)}
                className="bg-white text-black font-[500] text-sm md:text-[15px] px-5 py-2.5 rounded-[8px] hover:bg-neutral-200 transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black cursor-pointer shadow-sm flex items-center gap-2"
              >
                <span>Hablemos</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            {/* Mobile Menu Toggle Button */}
            <div className="lg:hidden flex items-center">
              <button
                type="button"
                onClick={() => setMobileMenuOpen(true)}
                aria-label="Abrir menú"
                aria-expanded={mobileMenuOpen}
                className="p-2 text-white/90 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black rounded-[8px]"
              >
                <Menu className="w-6 h-6" />
              </button>
            </div>
          </nav>
        </header>

        {/* Hero Bottom-Left Content (Enhanced with Scroll-Linked Opacity) */}
        <main className="relative z-10 w-full px-6 md:px-12 lg:px-16 pb-10 md:pb-14 lg:pb-16 mt-auto">
          <motion.div
            style={{
              opacity: prefersReducedMotion ? 1 : scrollOpacity,
              y: prefersReducedMotion ? 0 : scrollYOffset,
            }}
            className="max-w-[840px] flex flex-col items-start text-left will-change-[opacity,transform]"
          >
            {/* Step 1: Etiqueta (Delay: 0ms) */}
            <motion.div
              initial={getInitialState()}
              animate={getAnimateState()}
              transition={getRevealTransition(0)}
              className="mb-4 md:mb-6 flex items-center gap-2.5"
            >
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <p className="text-xs sm:text-sm md:text-[15px] font-[300] tracking-wide text-white/90">
                Consultor Freelance Senior · M.Sc. en Ciberseguridad · Experiencia en Empresas Globales
              </p>
            </motion.div>

            {/* Step 2 & 3: H1 en dos bloques (Línea 1: 150ms, Línea 2: 300ms) */}
            <h1 className="text-[44px] sm:text-[58px] md:text-[72px] lg:text-[92px] font-[300] leading-[0.95] tracking-[-0.03em] break-words mb-6 md:mb-8">
              <motion.span
                className="block text-white"
                initial={getInitialState()}
                animate={getAnimateState()}
                transition={getRevealTransition(0.15)}
              >
                Blindamos y escalamos tu nube
              </motion.span>
              <motion.span
                className="block text-white/70"
                initial={getInitialState()}
                animate={getAnimateState()}
                transition={getRevealTransition(0.3)}
              >
                directamente, sin intermediarios.
              </motion.span>
            </h1>

            {/* Step 4: Párrafo (Delay: 450ms) */}
            <motion.div
              initial={getInitialState()}
              animate={getAnimateState()}
              transition={getRevealTransition(0.45)}
              className="max-w-[620px] mb-8 md:mb-10"
            >
              <p className="text-[16px] md:text-[18px] font-[300] leading-relaxed text-neutral-300 break-words">
                Ayudo a CTOs y equipos de ingeniería en crecimiento a modernizar su infraestructura en AWS, GCP o Azure con Kubernetes, GitOps y seguridad de nivel militar. Sin comerciales de agencia ni juniors revendidos: trabajas de ingeniero senior a líder técnico.
              </p>
            </motion.div>

            {/* Step 5: Botones (Delay: 600ms) */}
            <motion.div
              initial={getInitialState()}
              animate={getAnimateState()}
              transition={getRevealTransition(0.6)}
              className="flex flex-wrap items-center gap-3 sm:gap-4 mb-8"
            >
              <button
                type="button"
                onClick={() => setAuditModalOpen(true)}
                className="bg-white text-black font-[500] text-[15px] px-6 py-3.5 rounded-[8px] hover:bg-neutral-200 transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black cursor-pointer shadow-sm flex items-center gap-2"
              >
                <span>Agendar llamada técnica 1:1</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <a
                href="#formatos"
                className="border border-white/40 text-white font-[500] text-[15px] px-6 py-3.5 rounded-[8px] hover:border-white hover:bg-white/10 transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black cursor-pointer backdrop-blur-[2px] flex items-center gap-2"
              >
                <span>Formatos de contratación</span>
              </a>
            </motion.div>

            {/* Personal authority & technical credentials ticker */}
            <motion.div
              initial={getInitialState()}
              animate={getAnimateState()}
              transition={getRevealTransition(0.75)}
              className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-8 pt-6 border-t border-white/10 w-full"
            >
              <div>
                <p className="text-xl md:text-2xl font-[600] text-white">M.Sc.</p>
                <p className="text-xs font-[300] text-neutral-400 mt-1">Ciberseguridad y Redes</p>
              </div>
              <div>
                <p className="text-xl md:text-2xl font-[600] text-white">+10 Años</p>
                <p className="text-xs font-[300] text-neutral-400 mt-1">Producción global a escala</p>
              </div>
              <div>
                <p className="text-xl md:text-2xl font-[600] text-emerald-400">100%</p>
                <p className="text-xs font-[300] text-neutral-400 mt-1">Atención directa Senior</p>
              </div>
              <div>
                <p className="text-xl md:text-2xl font-[600] text-white">-40%</p>
                <p className="text-xs font-[300] text-neutral-400 mt-1">Ahorro medio en FinOps</p>
              </div>
            </motion.div>
          </motion.div>
        </main>
      </div>

      {/* =========================================================================
          SECCIÓN: PERFIL SENIOR & DIFERENCIAL FREELANCE (SOBRE MÍ)
         ========================================================================= */}
      <section
        id="sobre-mi"
        className="relative z-10 w-full px-6 md:px-12 lg:px-16 py-24 md:py-32 bg-black border-t border-white/10"
      >
        <div className="max-w-[1280px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            <div className="lg:col-span-5">
              <p className="text-xs md:text-sm font-[300] tracking-widest text-neutral-400 uppercase mb-3">
                Perfil del Consultor
              </p>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-[300] tracking-tight leading-[1.05] mb-6">
                Rigor de posgrado con experiencia real en el campo de batalla.
              </h2>
              <p className="text-sm md:text-base font-[300] text-neutral-300 leading-relaxed mb-6">
                He diseñado y operado sistemas que gestionan millones de transacciones por minuto en empresas globales con presencia en América y Europa. Cuento con una <strong>Maestría en Ciberseguridad</strong> que respalda cada decisión de arquitectura bajo un estricto enfoque Zero-Trust.
              </p>
              <p className="text-sm md:text-base font-[300] text-neutral-400 leading-relaxed">
                Al contratarme no pagas la estructura inflada de una agencia ni recibes a desarrolladores juniors que aprenden con tu infraestructura: obtienes el compromiso directo de un ingeniero senior enfocado en entregables tangibles y transferencia de conocimiento.
              </p>
            </div>

            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-6 rounded-[12px] bg-neutral-950 border border-white/10">
                <Award className="w-6 h-6 text-emerald-400 mb-4" />
                <h3 className="text-base font-[500] text-white mb-2">Maestría en Ciberseguridad</h3>
                <p className="text-xs sm:text-sm font-[300] text-neutral-400 leading-relaxed">
                  Especialización en criptografía aplicada, seguridad perimetral, gestión de identidad federada y defensas en profundidad para infraestructuras críticas.
                </p>
              </div>

              <div className="p-6 rounded-[12px] bg-neutral-950 border border-white/10">
                <Globe className="w-6 h-6 text-white mb-4" />
                <h3 className="text-base font-[500] text-white mb-2">Track Record Global</h3>
                <p className="text-xs sm:text-sm font-[300] text-neutral-400 leading-relaxed">
                  Experiencia práctica liderando nubes multirregionales para fintechs de pagos, plataformas SaaS B2B enterprise y compañías tecnológicas globales.
                </p>
              </div>

              <div className="p-6 rounded-[12px] bg-neutral-950 border border-white/10">
                <UserCheck className="w-6 h-6 text-white mb-4" />
                <h3 className="text-base font-[500] text-white mb-2">Cero Burocracia de Agencia</h3>
                <p className="text-xs sm:text-sm font-[300] text-neutral-400 leading-relaxed">
                  Comunicación transparente en Slack o Teams con tu equipo técnico, sprints ágiles, commits verificables y documentación limpia desde el primer día.
                </p>
              </div>

              <div className="p-6 rounded-[12px] bg-neutral-950 border border-white/10">
                <FileCheck className="w-6 h-6 text-emerald-400 mb-4" />
                <h3 className="text-base font-[500] text-white mb-2">Certificaciones Validadas</h3>
                <p className="text-xs sm:text-sm font-[300] text-neutral-400 leading-relaxed">
                  AWS Certified Solutions Architect Professional, CKA (Certified Kubernetes Administrator), HashiCorp Terraform Associate y auditorías SOC 2 superadas.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECCIÓN: FORMATOS DE COLABORACIÓN FREELANCE
         ========================================================================= */}
      <section
        id="formatos"
        className="relative z-10 w-full px-6 md:px-12 lg:px-16 py-24 md:py-32 bg-neutral-950/70 border-t border-white/10"
      >
        <div className="max-w-[1280px] mx-auto">
          <div className="text-center max-w-[768px] mx-auto mb-16">
            <p className="text-xs md:text-sm font-[300] tracking-widest text-neutral-400 uppercase mb-3">
              Modelos de Contratación Freelance
            </p>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-[300] tracking-tight leading-[1.05]">
              Flexibilidad para adaptarse al momento de tu empresa.
            </h2>
            <p className="text-sm md:text-base font-[300] text-neutral-400 mt-4 leading-relaxed">
              Elige entre una auditoría a precio cerrado, un proyecto de migración llave en mano o acompañamiento mensual como Fractional Lead DevOps.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {ENGAGEMENT_MODELS.map((model) => (
              <div
                key={model.id}
                className="p-8 rounded-[14px] bg-black border border-white/15 hover:border-white/35 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-[500] text-emerald-400 bg-emerald-400/10 px-2.5 py-1 rounded-full border border-emerald-400/20">
                      {model.badge}
                    </span>
                    <span className="text-xs font-[300] text-neutral-400">
                      {model.duration}
                    </span>
                  </div>

                  <h3 className="text-2xl font-[500] text-white mb-2">
                    {model.title}
                  </h3>
                  <p className="text-xs font-[300] text-neutral-400 mb-6">
                    {model.scope}
                  </p>

                  <p className="text-sm font-[300] text-neutral-300 leading-relaxed mb-6">
                    {model.description}
                  </p>

                  <div className="space-y-3 pt-4 border-t border-white/10 mb-8">
                    <p className="text-xs font-[500] text-neutral-400 uppercase tracking-wider">
                      Qué incluye:
                    </p>
                    {model.deliverables.map((d, dIdx) => (
                      <div key={dIdx} className="flex items-start gap-2.5 text-xs font-[300] text-neutral-300">
                        <CheckCircle2 className="w-3.5 h-3.5 text-white/70 shrink-0 mt-0.5" />
                        <span>{d}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <div className="p-3 rounded-[8px] bg-neutral-900/60 border border-white/5 mb-6">
                    <p className="text-[11px] font-[300] text-neutral-400">
                      <strong>Ideal para:</strong> {model.idealFor}
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      setAuditForm((prev) => ({ ...prev, engagementType: model.title }));
                      setAuditModalOpen(true);
                    }}
                    className="w-full bg-white text-black font-[500] text-sm py-3 rounded-[8px] hover:bg-neutral-200 transition-colors cursor-pointer flex items-center justify-center gap-1.5"
                  >
                    <span>{model.cta}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECCIÓN: SERVICIOS TÉCNICOS DETALLADOS
         ========================================================================= */}
      <section
        id="servicios"
        className="relative z-10 w-full px-6 md:px-12 lg:px-16 py-24 md:py-32 bg-black border-t border-white/10"
      >
        <div className="max-w-[1280px] mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div>
              <p className="text-xs md:text-sm font-[300] tracking-widest text-neutral-400 uppercase mb-3">
                Especialidades de Consultoría
              </p>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-[300] tracking-tight leading-[1.05]">
                Ingeniería Cloud con ADN de Ciberseguridad.
              </h2>
            </div>
            <p className="max-w-[480px] text-sm md:text-base font-[300] text-neutral-400 leading-relaxed">
              Cada solución técnica está blindada por diseño. Infraestructuras resilientes, seguras y orientadas a la reducción del gasto operacional.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {SERVICES.map((srv) => {
              const IconComp = srv.icon;
              return (
                <div
                  key={srv.id}
                  className="group relative p-8 rounded-[12px] bg-neutral-950/70 border border-white/10 hover:border-white/30 transition-all duration-300 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-6">
                      <div className="w-12 h-12 rounded-[8px] bg-white/5 border border-white/10 flex items-center justify-center text-white group-hover:bg-white group-hover:text-black transition-colors duration-300">
                        <IconComp className="w-6 h-6" />
                      </div>
                      <span className="text-xs font-[300] text-neutral-400 tracking-wider">
                        {srv.tagline}
                      </span>
                    </div>

                    <h3 className="text-xl font-[500] text-white mb-3">
                      {srv.title}
                    </h3>

                    <p className="text-sm font-[300] text-neutral-400 leading-relaxed mb-6">
                      {srv.description}
                    </p>

                    <ul className="space-y-2.5 mb-8">
                      {srv.features.map((feat, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-xs font-[300] text-neutral-300">
                          <CheckCircle2 className="w-3.5 h-3.5 text-white/60 shrink-0 mt-0.5" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="pt-6 border-t border-white/10 flex items-center justify-between">
                    <div>
                      <p className="text-xs font-[300] text-neutral-500 uppercase tracking-wider">{srv.metricLabel}</p>
                      <p className="text-lg font-[600] text-white mt-0.5">{srv.metric}</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        setAuditForm((prev) => ({ ...prev, mainChallenge: srv.title }));
                        setAuditModalOpen(true);
                      }}
                      className="text-xs font-[500] text-white/80 hover:text-white flex items-center gap-1 group-hover:translate-x-0.5 transition-transform cursor-pointer"
                    >
                      Consultar
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECCIÓN: BLUEPRINT INTERACTIVO DE ARQUITECTURA & CIBERSEGURIDAD
         ========================================================================= */}
      <section
        id="arquitectura"
        className="relative z-10 w-full px-6 md:px-12 lg:px-16 py-24 md:py-32 bg-neutral-950/70 border-t border-white/10"
      >
        <div className="max-w-[1280px] mx-auto">
          <div className="mb-12">
            <p className="text-xs md:text-sm font-[300] tracking-widest text-neutral-400 uppercase mb-3">
              Estándares Técnicos Aplicados
            </p>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-[300] tracking-tight leading-[1.05] max-w-[768px]">
              Inspecciona los manifiestos y políticas que implemento.
            </h2>
          </div>

          {/* Blueprint Selector Tabs */}
          <div className="flex flex-wrap items-center gap-2 p-1.5 rounded-[10px] bg-black border border-white/10 max-w-fit mb-8">
            <button
              type="button"
              onClick={() => setActiveBlueprint('gitops')}
              className={`px-4 py-2 rounded-[8px] text-xs sm:text-sm font-[500] transition-colors cursor-pointer ${
                activeBlueprint === 'gitops'
                  ? 'bg-white text-black'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              1. GitOps &amp; Despliegues Canarios
            </button>
            <button
              type="button"
              onClick={() => setActiveBlueprint('kubernetes')}
              className={`px-4 py-2 rounded-[8px] text-xs sm:text-sm font-[500] transition-colors cursor-pointer ${
                activeBlueprint === 'kubernetes'
                  ? 'bg-white text-black'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              2. Topología Kubernetes &amp; Autoscaling
            </button>
            <button
              type="button"
              onClick={() => setActiveBlueprint('security')}
              className={`px-4 py-2 rounded-[8px] text-xs sm:text-sm font-[500] transition-colors cursor-pointer ${
                activeBlueprint === 'security'
                  ? 'bg-white text-black'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              3. DevSecOps &amp; Zero-Trust
            </button>
          </div>

          {/* Interactive Blueprint Viewer */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 bg-black rounded-[16px] border border-white/10 p-6 md:p-10">
            {/* Steps Workflow List */}
            <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
              <div>
                <h3 className="text-xl md:text-2xl font-[500] text-white mb-2">
                  {BLUEPRINTS[activeBlueprint].title}
                </h3>
                <p className="text-sm font-[300] text-neutral-400 mb-8">
                  {BLUEPRINTS[activeBlueprint].subtitle}
                </p>

                <div className="space-y-4">
                  {BLUEPRINTS[activeBlueprint].steps.map((st, i) => (
                    <div key={i} className="flex items-start gap-3.5 group">
                      <div className="w-6 h-6 rounded-full bg-white/10 text-white font-[500] text-xs flex items-center justify-center shrink-0 mt-0.5 border border-white/20">
                        {i + 1}
                      </div>
                      <div>
                        <p className="text-sm font-[500] text-white">{st.name}</p>
                        <p className="text-xs font-[300] text-neutral-400 mt-0.5 leading-relaxed">
                          {st.desc}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-6 border-t border-white/10 flex items-center justify-between">
                <span className="text-xs font-[300] text-neutral-500">
                  Infraestructura 100% como código declarativa
                </span>
                <button
                  type="button"
                  onClick={() => setAuditModalOpen(true)}
                  className="text-xs font-[500] text-white underline underline-offset-4 hover:text-neutral-300 cursor-pointer"
                >
                  Implementar este stack
                </button>
              </div>
            </div>

            {/* Declarative Manifest / Terminal Output */}
            <div className="lg:col-span-7 bg-neutral-950 rounded-[12px] border border-white/10 overflow-hidden flex flex-col">
              <div className="flex items-center justify-between px-4 py-3 bg-black/60 border-b border-white/10">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-rose-500/80" />
                  <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                  <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                  <span className="ml-2 text-xs font-mono text-neutral-400">
                    security-manifest.yaml
                  </span>
                </div>
                <span className="text-[11px] font-mono text-emerald-400 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                  Audit: Conforme CIS Benchmark
                </span>
              </div>
              <div className="p-5 font-mono text-xs text-neutral-300 overflow-x-auto leading-relaxed h-full flex flex-col justify-center">
                <pre>{BLUEPRINTS[activeBlueprint].code}</pre>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECCIÓN: INSIGHTS TÉCNICOS (ARTÍCULOS BREVES: KUBERNETES, SEGURIDAD & FINOPS)
         ========================================================================= */}
      <section
        id="insights"
        className="relative z-10 w-full px-6 md:px-12 lg:px-16 py-24 md:py-32 bg-black border-t border-white/10"
      >
        <div className="max-w-[1280px] mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <div>
              <p className="text-xs md:text-sm font-[300] tracking-widest text-neutral-400 uppercase mb-3">
                Bitácora de Arquitectura &amp; Casos Reales
              </p>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-[300] tracking-tight leading-[1.05]">
                Insights Técnicos
              </h2>
            </div>
            <p className="max-w-[480px] text-sm md:text-base font-[300] text-neutral-400 leading-relaxed">
              Lecciones aprendidas, patrones de diseño y mejores prácticas en Kubernetes, ciberseguridad cloud y optimización FinOps probadas en producción.
            </p>
          </div>

          {/* Category Filter Tabs */}
          <div className="flex flex-wrap items-center gap-2 mb-10 pb-4 border-b border-white/10">
            {(['Todos', 'Kubernetes', 'Seguridad Cloud', 'FinOps'] as const).map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setArticleFilter(cat)}
                className={`px-3.5 py-1.5 rounded-[6px] text-xs font-[500] transition-colors cursor-pointer ${
                  articleFilter === cat
                    ? 'bg-white text-black'
                    : 'text-neutral-400 hover:text-white bg-white/5 border border-white/10'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {filteredArticles.map((article) => (
              <article
                key={article.id}
                className="group relative p-7 rounded-[14px] bg-neutral-950/70 border border-white/10 hover:border-white/30 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  {/* Category, Date & Read Time (Clean unboxed typographic text without pills) */}
                  <div className="flex items-center justify-between text-xs font-[300] text-neutral-400 mb-4">
                    <span className="text-white/80 font-[400]">{article.category}</span>
                    <span>
                      {article.date} · {article.readTime}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-[500] text-white group-hover:text-neutral-100 transition-colors leading-snug mb-3">
                    {article.title}
                  </h3>

                  {/* Summary */}
                  <p className="text-sm font-[300] text-neutral-400 leading-relaxed mb-6">
                    {article.summary}
                  </p>
                </div>

                {/* Card Footer with "Leer más" Button */}
                <div className="pt-5 border-t border-white/10 flex items-center justify-between">
                  <span className="text-xs font-[300] text-neutral-500">
                    Arquitectura verificada
                  </span>
                  <button
                    type="button"
                    onClick={() => setSelectedArticle(article)}
                    className="text-xs font-[500] text-white hover:text-neutral-300 flex items-center gap-1.5 cursor-pointer py-1 group/btn"
                  >
                    <span>Leer más</span>
                    <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover/btn:translate-x-1" />
                  </button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECCIÓN: CALCULADORA FINOPS & RETORNO DE INVERSIÓN
         ========================================================================= */}
      <section
        id="calculadora"
        className="relative z-10 w-full px-6 md:px-12 lg:px-16 py-24 md:py-32 bg-black border-t border-white/10"
      >
        <div className="max-w-[1280px] mx-auto">
          <div className="text-center max-w-[768px] mx-auto mb-16">
            <p className="text-xs md:text-sm font-[300] tracking-widest text-neutral-400 uppercase mb-3">
              Calculadora FinOps &amp; Eficiencia
            </p>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-[300] tracking-tight leading-[1.05]">
              Estima el ahorro mensual en tu factura de nube.
            </h2>
            <p className="text-sm md:text-base font-[300] text-neutral-400 mt-4 leading-relaxed">
              La consultoría freelance se amortiza sola con la reducción directa del desperdicio en AWS, GCP o Azure durante los primeros meses.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-neutral-950/70 p-6 md:p-12 rounded-[16px] border border-white/10">
            {/* Controls */}
            <div className="lg:col-span-6 space-y-8">
              {/* Slider 1: Monthly Spend */}
              <div>
                <div className="flex justify-between items-center mb-3">
                  <label htmlFor="spend-slider" className="text-sm font-[500] text-white">
                    Gasto actual mensual en la nube (AWS / GCP / Azure)
                  </label>
                  <span className="text-lg font-[600] text-emerald-400">
                    ${monthlySpend.toLocaleString('en-US')} USD
                  </span>
                </div>
                <input
                  id="spend-slider"
                  type="range"
                  min="5000"
                  max="150000"
                  step="2500"
                  value={monthlySpend}
                  onChange={(e) => setMonthlySpend(Number(e.target.value))}
                  className="w-full accent-white cursor-pointer h-2 bg-neutral-800 rounded-lg"
                />
                <div className="flex justify-between text-[11px] font-[300] text-neutral-500 mt-1.5">
                  <span>$5,000 / mes</span>
                  <span>$75,000 / mes</span>
                  <span>$150,000+ / mes</span>
                </div>
              </div>

              {/* Slider 2: Team Size */}
              <div>
                <div className="flex justify-between items-center mb-3">
                  <label htmlFor="team-slider" className="text-sm font-[500] text-white">
                    Cantidad de desarrolladores e ingenieros de software
                  </label>
                  <span className="text-lg font-[600] text-white">{teamSize} ingenieros</span>
                </div>
                <input
                  id="team-slider"
                  type="range"
                  min="3"
                  max="60"
                  step="1"
                  value={teamSize}
                  onChange={(e) => setTeamSize(Number(e.target.value))}
                  className="w-full accent-white cursor-pointer h-2 bg-neutral-800 rounded-lg"
                />
              </div>

              {/* Control 3: Incident Frequency */}
              <div>
                <label className="text-sm font-[500] text-white block mb-3">
                  Frecuencia de incidentes o fricciones de despliegue
                </label>
                <div className="grid grid-cols-3 gap-3">
                  <button
                    type="button"
                    onClick={() => setIncidentFrequency('weekly')}
                    className={`py-2.5 px-3 rounded-[8px] text-xs font-[500] border transition-colors cursor-pointer ${
                      incidentFrequency === 'weekly'
                        ? 'bg-white text-black border-white'
                        : 'bg-black text-neutral-400 border-white/10 hover:border-white/30'
                    }`}
                  >
                    Semanal / Frecuente
                  </button>
                  <button
                    type="button"
                    onClick={() => setIncidentFrequency('monthly')}
                    className={`py-2.5 px-3 rounded-[8px] text-xs font-[500] border transition-colors cursor-pointer ${
                      incidentFrequency === 'monthly'
                        ? 'bg-white text-black border-white'
                        : 'bg-black text-neutral-400 border-white/10 hover:border-white/30'
                    }`}
                  >
                    Mensual
                  </button>
                  <button
                    type="button"
                    onClick={() => setIncidentFrequency('rarely')}
                    className={`py-2.5 px-3 rounded-[8px] text-xs font-[500] border transition-colors cursor-pointer ${
                      incidentFrequency === 'rarely'
                        ? 'bg-white text-black border-white'
                        : 'bg-black text-neutral-400 border-white/10 hover:border-white/30'
                    }`}
                  >
                    Ocasional
                  </button>
                </div>
              </div>
            </div>

            {/* Estimated ROI Card */}
            <div className="lg:col-span-6 bg-black rounded-[12px] border border-white/15 p-8 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between pb-6 border-b border-white/10 mb-6">
                  <span className="text-xs font-[300] tracking-wider text-neutral-400 uppercase">
                    Ahorro FinOps Anual Estimado
                  </span>
                  <span className="text-xs font-[500] text-emerald-400 bg-emerald-400/10 px-2.5 py-1 rounded-full border border-emerald-400/20">
                    ~40% reducción directa
                  </span>
                </div>

                <div className="space-y-6">
                  <div>
                    <p className="text-xs font-[300] text-neutral-400">Ahorro financiero proyectado por año</p>
                    <p className="text-4xl md:text-5xl font-[600] text-white mt-1">
                      ${annualSavings.toLocaleString('en-US')} <span className="text-lg font-[300] text-neutral-400">USD/año</span>
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/10">
                    <div>
                      <p className="text-xs font-[300] text-neutral-400">Ahorro mensual recurrente</p>
                      <p className="text-xl font-[600] text-emerald-400 mt-0.5">
                        ${monthlySavings.toLocaleString('en-US')} USD
                      </p>
                    </div>
                    <div>
                      <p className="text-xs font-[300] text-neutral-400">Horas dev recuperadas</p>
                      <p className="text-xl font-[600] text-white mt-0.5">
                        +{totalDevHoursMonth} hrs / mes
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-8 mt-8 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => {
                    setAuditForm((prev) => ({
                      ...prev,
                      notes: `Estimación calculadora: Gasto $${monthlySpend} USD/mes con ${teamSize} ingenieros.`,
                    }));
                    setAuditModalOpen(true);
                  }}
                  className="w-full bg-white text-black font-[500] text-sm md:text-base py-3.5 rounded-[8px] hover:bg-neutral-200 transition-colors cursor-pointer flex items-center justify-center gap-2"
                >
                  <span>Agendar revisión técnica para capturar este ahorro</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <p className="text-center text-[11px] font-[300] text-neutral-500 mt-2.5">
                  Evaluación inicial sin compromiso y bajo acuerdo de confidencialidad
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          BANNER FINAL DE LLAMADA A LA ACCIÓN
         ========================================================================= */}
      <section className="relative z-10 w-full px-6 md:px-12 lg:px-16 py-20 bg-neutral-950 border-t border-white/10 text-center">
        <div className="max-w-[768px] mx-auto">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-[300] tracking-tight text-white mb-6">
            Elevemos juntos la seguridad y escalabilidad de tu nube.
          </h2>
          <p className="text-sm md:text-base font-[300] text-neutral-400 mb-8 max-w-[540px] mx-auto leading-relaxed">
            Hablemos de tus desafíos actuales en una sesión de 30 minutos sin compromiso. Te daré recomendaciones directas de arquitectura desde la primera llamada.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <button
              type="button"
              onClick={() => setAuditModalOpen(true)}
              className="bg-white text-black font-[500] text-[15px] px-8 py-3.5 rounded-[8px] hover:bg-neutral-200 transition-colors cursor-pointer shadow-sm"
            >
              Agendar sesión técnica 1:1
            </button>
            <a
              href="#formatos"
              className="border border-white/40 text-white font-[500] text-[15px] px-8 py-3.5 rounded-[8px] hover:border-white hover:bg-white/10 transition-colors cursor-pointer"
            >
              Ver opciones de contratación
            </a>
          </div>
        </div>
      </section>

      {/* =========================================================================
          FOOTER
         ========================================================================= */}
      <footer className="relative z-10 w-full px-6 md:px-12 lg:px-16 py-12 bg-black border-t border-white/10 text-neutral-500 text-xs font-[300]">
        <div className="max-w-[1280px] mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="w-7 h-7 rounded-[6px] bg-white text-black flex items-center justify-center font-[600] text-xs">
              EM
            </div>
            <span className="text-white font-[600] text-sm">Edwin Martínez</span>
            <span className="text-neutral-500">· Consultor Cloud &amp; DevSecOps (M.Sc. Ciberseguridad)</span>
          </div>

          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            <span className="text-neutral-400">Disponibilidad para nuevos proyectos &amp; auditorías</span>
          </div>

          <div className="text-neutral-500">
            © {new Date().getFullYear()} Edwin Martínez. Todos los derechos reservados.
          </div>
        </div>
      </footer>

      {/* =========================================================================
          MODAL: AGENDAR CONSULTA TÉCNICA 1:1
         ========================================================================= */}
      <AnimatePresence>
        {auditModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setAuditModalOpen(false)}
              className="fixed inset-0 bg-black/80 backdrop-blur-sm"
            />

            <motion.div
              role="dialog"
              aria-modal="true"
              aria-labelledby="audit-modal-title"
              initial={{ opacity: 0, scale: 0.95, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 16 }}
              transition={{ duration: 0.2 }}
              className="relative w-full max-w-[560px] bg-neutral-950 border border-white/20 rounded-[16px] p-6 sm:p-8 shadow-2xl z-10"
            >
              <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-6">
                <div>
                  <h3 id="audit-modal-title" className="text-xl font-[500] text-white">
                    Consulta Técnica Directa 1:1
                  </h3>
                  <p className="text-xs font-[300] text-neutral-400 mt-1">
                    Sesión de exploración de 30 minutos directamente con tu consultor senior
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setAuditModalOpen(false)}
                  aria-label="Cerrar ventana"
                  className="p-1.5 text-neutral-400 hover:text-white rounded-[6px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {auditSubmitted ? (
                <div className="py-12 text-center flex flex-col items-center">
                  <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mb-4 border border-emerald-500/40">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <h4 className="text-lg font-[500] text-white mb-2">
                    ¡Mensaje recibido con éxito!
                  </h4>
                  <p className="text-xs sm:text-sm font-[300] text-neutral-300 max-w-[380px] leading-relaxed">
                    Te responderé personalmente en menos de 24 horas con un enlace a mi calendario para coordinar nuestra sesión técnica 1:1.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleAuditSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-[500] text-neutral-300 mb-1.5">
                      Nombre completo
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Ej. Carlos Mendoza"
                      value={auditForm.name}
                      onChange={(e) => setAuditForm({ ...auditForm, name: e.target.value })}
                      className="w-full bg-black border border-white/15 rounded-[8px] px-3.5 py-2.5 text-sm text-white placeholder-neutral-600 focus:outline-none focus:border-white focus:ring-1 focus:ring-white"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-[500] text-neutral-300 mb-1.5">
                        Email de trabajo
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="carlos@empresa.com"
                        value={auditForm.email}
                        onChange={(e) => setAuditForm({ ...auditForm, email: e.target.value })}
                        className="w-full bg-black border border-white/15 rounded-[8px] px-3.5 py-2.5 text-sm text-white placeholder-neutral-600 focus:outline-none focus:border-white focus:ring-1 focus:ring-white"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-[500] text-neutral-300 mb-1.5">
                        Empresa / Proyecto
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="Ej. Innova Fintech"
                        value={auditForm.company}
                        onChange={(e) => setAuditForm({ ...auditForm, company: e.target.value })}
                        className="w-full bg-black border border-white/15 rounded-[8px] px-3.5 py-2.5 text-sm text-white placeholder-neutral-600 focus:outline-none focus:border-white focus:ring-1 focus:ring-white"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-[500] text-neutral-300 mb-1.5">
                        Formato de Interés
                      </label>
                      <select
                        value={auditForm.engagementType}
                        onChange={(e) => setAuditForm({ ...auditForm, engagementType: e.target.value })}
                        className="w-full bg-black border border-white/15 rounded-[8px] px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-white focus:ring-1 focus:ring-white cursor-pointer"
                      >
                        <option value="Auditoría Técnica Express (1-2 semanas)">Auditoría Express (1-2 semanas)</option>
                        <option value="Modernización & Migración (Proyecto)">Modernización / Migración (Proyecto)</option>
                        <option value="Fractional Lead DevOps (Retainer mensual)">Fractional Lead DevOps (Mensual)</option>
                        <option value="Asesoría puntual">Asesoría puntual de arquitectura</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-[500] text-neutral-300 mb-1.5">
                        Proveedor Cloud Principal
                      </label>
                      <select
                        value={auditForm.cloudProvider}
                        onChange={(e) => setAuditForm({ ...auditForm, cloudProvider: e.target.value })}
                        className="w-full bg-black border border-white/15 rounded-[8px] px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-white focus:ring-1 focus:ring-white cursor-pointer"
                      >
                        <option value="AWS">Amazon Web Services (AWS)</option>
                        <option value="GCP">Google Cloud Platform (GCP)</option>
                        <option value="Azure">Microsoft Azure</option>
                        <option value="Multi-Cloud">Multi-Cloud / Híbrida</option>
                        <option value="On-Premise">On-Premise / Bare Metal</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-[500] text-neutral-300 mb-1.5">
                      Describe brevemente tu objetivo técnico o desafío (opcional)
                    </label>
                    <textarea
                      rows={3}
                      placeholder="Ej. Queremos migrar cargas a Kubernetes EKS, optimizar costes y cerrar requisitos de seguridad para certificar SOC2..."
                      value={auditForm.notes}
                      onChange={(e) => setAuditForm({ ...auditForm, notes: e.target.value })}
                      className="w-full bg-black border border-white/15 rounded-[8px] px-3.5 py-2 text-sm text-white placeholder-neutral-600 focus:outline-none focus:border-white focus:ring-1 focus:ring-white resize-none"
                    />
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      className="w-full bg-white text-black font-[500] text-sm py-3.5 rounded-[8px] hover:bg-neutral-200 transition-colors cursor-pointer"
                    >
                      Enviar solicitud directamente a mi bandeja
                    </button>
                    <p className="text-[11px] font-[300] text-neutral-500 text-center mt-2">
                      Sin spam ni llamadas comerciales invasivas. Trato estrictamente técnico.
                    </p>
                  </div>
                </form>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* =========================================================================
          MODAL: LECTOR DE ARTÍCULO / INSIGHT TÉCNICO COMPLETO
         ========================================================================= */}
      <AnimatePresence>
        {selectedArticle && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-8">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedArticle(null)}
              className="fixed inset-0 bg-black/85 backdrop-blur-sm"
            />

            <motion.div
              role="dialog"
              aria-modal="true"
              aria-labelledby="article-modal-title"
              initial={{ opacity: 0, scale: 0.96, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 16 }}
              transition={{ duration: 0.2 }}
              className="relative w-full max-w-[760px] max-h-[90vh] bg-neutral-950 border border-white/20 rounded-[16px] p-6 sm:p-8 md:p-10 shadow-2xl z-10 overflow-y-auto"
            >
              {/* Header */}
              <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-6">
                <div className="flex items-center gap-2 text-xs font-[300] text-neutral-400">
                  <span className="text-white font-[500]">{selectedArticle.category}</span>
                  <span>·</span>
                  <span>{selectedArticle.date}</span>
                  <span>·</span>
                  <span>{selectedArticle.readTime}</span>
                </div>
                <button
                  type="button"
                  onClick={() => setSelectedArticle(null)}
                  aria-label="Cerrar artículo"
                  className="p-1.5 text-neutral-400 hover:text-white rounded-[6px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Title */}
              <h2 id="article-modal-title" className="text-2xl sm:text-3xl font-[500] text-white leading-tight mb-4">
                {selectedArticle.title}
              </h2>

              {/* Summary lead */}
              <p className="text-base font-[300] text-neutral-300 leading-relaxed mb-6 pb-6 border-b border-white/10">
                {selectedArticle.summary}
              </p>

              {/* Problem & Solution Breakdown */}
              <div className="space-y-6 mb-8">
                <div>
                  <h4 className="text-xs font-[500] text-rose-400 uppercase tracking-wider mb-2">
                    El Desafío en Producción
                  </h4>
                  <p className="text-sm font-[300] text-neutral-300 leading-relaxed">
                    {selectedArticle.problem}
                  </p>
                </div>

                <div>
                  <h4 className="text-xs font-[500] text-emerald-400 uppercase tracking-wider mb-2">
                    Solución de Arquitectura
                  </h4>
                  <p className="text-sm font-[300] text-neutral-300 leading-relaxed">
                    {selectedArticle.solution}
                  </p>
                </div>

                {/* Key Implementation Points */}
                <div>
                  <h4 className="text-xs font-[500] text-neutral-400 uppercase tracking-wider mb-3">
                    Puntos Clave de Implementación
                  </h4>
                  <ul className="space-y-2.5">
                    {selectedArticle.keyPoints.map((pt, idx) => (
                      <li key={idx} className="flex items-start gap-2.5 text-sm font-[300] text-neutral-300">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                        <span>{pt}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Code Snippet if present */}
                {selectedArticle.codeSnippet && (
                  <div className="rounded-[10px] bg-black border border-white/15 overflow-hidden">
                    <div className="px-4 py-2.5 bg-neutral-900 border-b border-white/10 flex items-center justify-between text-xs font-mono text-neutral-400">
                      <span>{selectedArticle.codeSnippet.title}</span>
                      <span className="text-[11px] text-neutral-500">YAML</span>
                    </div>
                    <pre className="p-4 text-xs font-mono text-neutral-200 overflow-x-auto leading-relaxed">
                      {selectedArticle.codeSnippet.code}
                    </pre>
                  </div>
                )}
              </div>

              {/* Footer action */}
              <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
                <span className="text-xs font-[300] text-neutral-400">
                  ¿Deseas implementar esta arquitectura en tu empresa?
                </span>
                <button
                  type="button"
                  onClick={() => {
                    const articleName = selectedArticle.title;
                    setSelectedArticle(null);
                    setAuditForm((prev) => ({
                      ...prev,
                      mainChallenge: `Consulta sobre: ${articleName}`,
                    }));
                    setAuditModalOpen(true);
                  }}
                  className="w-full sm:w-auto bg-white text-black font-[500] text-sm px-5 py-2.5 rounded-[8px] hover:bg-neutral-200 transition-colors cursor-pointer"
                >
                  Consultar con el consultor
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* =========================================================================
          MENÚ MÓVIL OVERLAY
         ========================================================================= */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Menú de navegación móvil"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 bg-black flex flex-col justify-between p-6"
          >
            {/* Top Bar of Mobile Menu */}
            <div className="flex items-center justify-between">
              <div>
                <span className="text-white text-xl font-[600] tracking-tight block">
                  Edwin Martínez
                </span>
                <span className="text-[11px] font-[300] text-neutral-400">
                  Cloud &amp; DevSecOps Freelance
                </span>
              </div>
              <button
                type="button"
                onClick={() => setMobileMenuOpen(false)}
                aria-label="Cerrar menú"
                className="p-2 text-white hover:text-white/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white rounded-[8px]"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Mobile Navigation Links */}
            <div className="flex flex-col space-y-6 my-auto text-left">
              <a
                href="#sobre-mi"
                onClick={() => setMobileMenuOpen(false)}
                className="text-2xl font-[300] text-white hover:text-white/70 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white rounded-[4px] py-1"
              >
                Perfil &amp; Credenciales
              </a>
              <a
                href="#formatos"
                onClick={() => setMobileMenuOpen(false)}
                className="text-2xl font-[300] text-white hover:text-white/70 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white rounded-[4px] py-1"
              >
                Formatos de Trabajo
              </a>
              <a
                href="#servicios"
                onClick={() => setMobileMenuOpen(false)}
                className="text-2xl font-[300] text-white hover:text-white/70 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white rounded-[4px] py-1"
              >
                Servicios Técnicos
              </a>
              <a
                href="#arquitectura"
                onClick={() => setMobileMenuOpen(false)}
                className="text-2xl font-[300] text-white hover:text-white/70 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white rounded-[4px] py-1"
              >
                Blueprints &amp; Seguridad
              </a>
              <a
                href="#insights"
                onClick={() => setMobileMenuOpen(false)}
                className="text-2xl font-[300] text-white hover:text-white/70 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white rounded-[4px] py-1"
              >
                Insights Técnicos
              </a>
              <a
                href="#calculadora"
                onClick={() => setMobileMenuOpen(false)}
                className="text-2xl font-[300] text-white hover:text-white/70 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white rounded-[4px] py-1"
              >
                Calculadora ROI
              </a>
            </div>

            {/* Mobile CTA Button */}
            <div className="pt-6">
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  setAuditModalOpen(true);
                }}
                className="w-full bg-white text-black font-[500] text-base py-3.5 rounded-[8px] hover:bg-neutral-200 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black cursor-pointer"
              >
                Agendar sesión técnica 1:1
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
