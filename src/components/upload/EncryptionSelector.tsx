import React from 'react';
import { Shield, Lock, Server, Database, Cpu } from 'lucide-react';
import type { EncryptionTier } from '../../types/file';

const ENCRYPTION_TIERS = {
  none: {
    icon: Shield,
    name: 'No Encryption',
    description: 'Files stored without encryption',
    features: ['Basic storage', 'No encryption', 'Fast access']
  },
  basic: {
    icon: Lock,
    name: 'Basic Encryption',
    description: 'Standard AES-256 encryption',
    features: ['AES-256 encryption', 'Secure transfer', 'Key management']
  },
  advanced: {
    icon: Server,
    name: 'Advanced Security',
    description: 'Enhanced encryption with additional features',
    features: ['End-to-end encryption', 'Zero-knowledge storage', '2FA required']
  },
  enterprise: {
    icon: Database,
    name: 'Enterprise Grade',
    description: 'Full suite of enterprise security features',
    features: ['HSM support', 'Audit logging', 'Compliance controls']
  },
  quantum: {
    icon: Cpu,
    name: 'Quantum Resistant',
    description: 'Future-proof quantum-resistant encryption',
    features: ['Post-quantum algorithms', 'Quantum key distribution', 'Advanced security']
  }
} as const;

interface EncryptionSelectorProps {
  selected: EncryptionTier;
  onChange: (tier: EncryptionTier) => void;
}

export function EncryptionSelector({ selected, onChange }: EncryptionSelectorProps) {
  return (
    <div>
      <h3 className="text-sm font-medium text-gray-900 mb-4">Select Security Level</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-h-[calc(100vh-24rem)] overflow-y-auto">
        {(Object.entries(ENCRYPTION_TIERS) as [EncryptionTier, typeof ENCRYPTION_TIERS[keyof typeof ENCRYPTION_TIERS]][]).map(([tier, details]) => {
          const Icon = details.icon;
          const isSelected = selected === tier;

          return (
            <button
              key={tier}
              onClick={() => onChange(tier)}
              className={`
                p-4 rounded-lg border-2 text-left transition-all
                ${isSelected 
                  ? 'border-indigo-600 bg-indigo-50' 
                  : 'border-gray-200 hover:border-indigo-300'
                }
              `}
              aria-pressed={isSelected}
            >
              <div className="flex items-center mb-2">
                <Icon className={`h-5 w-5 ${
                  isSelected ? 'text-indigo-600' : 'text-gray-500'
                }`} />
                <h4 className="ml-2 font-medium text-gray-900">{details.name}</h4>
              </div>
              <p className="text-sm text-gray-600 mb-2">{details.description}</p>
              <ul className="text-xs text-gray-500 space-y-1">
                {details.features.map((feature, index) => (
                  <li key={index}>• {feature}</li>
                ))}
              </ul>
            </button>
          );
        })}
      </div>
    </div>
  );
}