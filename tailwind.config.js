import { fontFamily } from "tailwindcss/defaultTheme";

/** @type {import('tailwindcss').Config} */
const config = {
	darkMode: ["class"],
	content: ["./src/**/*.{html,js,svelte,ts}"],
	safelist: ["dark"],
	theme: {
		container: {
			center: true,
			padding: "2rem",
			screens: {
				"2xl": "1400px"
			}
		},
		extend: {
			colors: {
				// Notabene Design System Colors
				notabene: {
					50: '#f8f9fa',
					100: '#f1f3f4',
					200: '#e8eaed',
					300: '#dadce0',
					400: '#bdc1c6',
					500: '#9aa0a6',
					600: '#80868b',
					700: '#5f6368',
					800: '#3c4043',
					900: '#202124',
					950: '#0d1117'
				},
				// Content colors for readability
				content: {
					primary: '#0d1117',
					secondary: '#656d76',
					tertiary: '#8b949e',
					inverse: '#ffffff',
					accent: '#0969da',
					success: '#1a7f37',
					warning: '#9a6700',
					error: '#d1242f'
				},
				// Surface colors
				surface: {
					primary: '#ffffff',
					secondary: '#f6f8fa',
					tertiary: '#f1f3f4',
					elevated: '#ffffff',
					overlay: 'rgba(0, 0, 0, 0.6)'
				},
				// Legacy colors for compatibility
				border: "hsl(var(--border) / <alpha-value>)",
				input: "hsl(var(--input) / <alpha-value>)",
				ring: "hsl(var(--ring) / <alpha-value>)",
				background: "hsl(var(--background) / <alpha-value>)",
				foreground: "hsl(var(--foreground) / <alpha-value>)",
				primary: {
					DEFAULT: "hsl(var(--primary) / <alpha-value>)",
					foreground: "hsl(var(--primary-foreground) / <alpha-value>)"
				},
				secondary: {
					DEFAULT: "hsl(var(--secondary) / <alpha-value>)",
					foreground: "hsl(var(--secondary-foreground) / <alpha-value>)"
				},
				destructive: {
					DEFAULT: "hsl(var(--destructive) / <alpha-value>)",
					foreground: "hsl(var(--destructive-foreground) / <alpha-value>)"
				},
				muted: {
					DEFAULT: "hsl(var(--muted) / <alpha-value>)",
					foreground: "hsl(var(--muted-foreground) / <alpha-value>)"
				},
				accent: {
					DEFAULT: "hsl(var(--accent) / <alpha-value>)",
					foreground: "hsl(var(--accent-foreground) / <alpha-value>)"
				},
				popover: {
					DEFAULT: "hsl(var(--popover) / <alpha-value>)",
					foreground: "hsl(var(--popover-foreground) / <alpha-value>)"
				},
				card: {
					DEFAULT: "hsl(var(--card) / <alpha-value>)",
					foreground: "hsl(var(--card-foreground) / <alpha-value>)"
				}
			},
			borderRadius: {
				lg: "var(--radius)",
				md: "calc(var(--radius) - 2px)",
				sm: "calc(var(--radius) - 4px)"
			},
			fontFamily: {
				sans: ['Inter', 'ui-sans-serif', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', 'sans-serif'],
				serif: ['Charter', 'Bitstream Charter', 'Sitka Text', 'Cambria', 'serif'],
				mono: ['JetBrains Mono', 'Menlo', 'Monaco', 'Consolas', 'Liberation Mono', 'Courier New', 'monospace']
			},
			fontSize: {
				// Enhanced typography scale for readability
				'xs': ['0.75rem', { lineHeight: '1.5', letterSpacing: '0.025em' }],
				'sm': ['0.875rem', { lineHeight: '1.5', letterSpacing: '0.025em' }],
				'base': ['1rem', { lineHeight: '1.6', letterSpacing: '0.01em' }],
				'lg': ['1.125rem', { lineHeight: '1.6', letterSpacing: '0.01em' }],
				'xl': ['1.25rem', { lineHeight: '1.5', letterSpacing: '0.01em' }],
				'2xl': ['1.5rem', { lineHeight: '1.4', letterSpacing: '0.01em' }],
				'3xl': ['1.875rem', { lineHeight: '1.3', letterSpacing: '0.01em' }],
				'4xl': ['2.25rem', { lineHeight: '1.2', letterSpacing: '0.01em' }],
				'5xl': ['3rem', { lineHeight: '1.1', letterSpacing: '0.01em' }],
				'6xl': ['3.75rem', { lineHeight: '1.1', letterSpacing: '0.01em' }],
				'7xl': ['4.5rem', { lineHeight: '1.1', letterSpacing: '0.01em' }],
				'8xl': ['6rem', { lineHeight: '1.1', letterSpacing: '0.01em' }],
				'9xl': ['8rem', { lineHeight: '1.1', letterSpacing: '0.01em' }]
			},
			spacing: {
				'18': '4.5rem',
				'88': '22rem',
				'112': '28rem',
				'128': '32rem'
			},
			maxWidth: {
				'prose': '65ch',
				'prose-wide': '75ch',
				'prose-narrow': '55ch'
			},
			animation: {
				'fade-in': 'fade-in 0.5s ease-out',
				'slide-up': 'slide-up 0.3s ease-out'
			},
			keyframes: {
				'fade-in': {
					'0%': { opacity: '0' },
					'100%': { opacity: '1' }
				},
				'slide-up': {
					'0%': { transform: 'translateY(10px)', opacity: '0' },
					'100%': { transform: 'translateY(0)', opacity: '1' }
				}
			}
		}
	},
};

export default config;
