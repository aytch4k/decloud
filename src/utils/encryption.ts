import { EncryptionTier } from '../types/file';

export const encryptionTierDetails: Record<EncryptionTier, {
  name: string;
  description: string;
  features: string[];
}> = {
  none: {
    name: 'No Encryption',
    description: 'Files stored without encryption',
    features: ['No encryption', 'Public storage', 'Fast access'],
  },
  basic: {
    name: 'Basic Encryption',
    description: 'Standard AES-256 encryption',
    features: ['AES-256 encryption', 'Secure key storage', 'HTTPS transfer'],
  },
  advanced: {
    name: 'Advanced Security',
    description: 'Enhanced encryption with additional security features',
    features: ['End-to-end encryption', 'Zero-knowledge encryption', 'Multi-factor authentication'],
  },
  enterprise: {
    name: 'Enterprise Grade',
    description: 'Full suite of enterprise security features',
    features: ['Hardware security modules', 'Audit logging', 'Compliance controls', 'Role-based access'],
  },
  quantum: {
    name: 'Quantum Resistant',
    description: 'Future-proof quantum-resistant encryption',
    features: ['Post-quantum cryptography', 'Quantum key distribution', 'Lattice-based encryption'],
  },
};