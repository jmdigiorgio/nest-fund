'use client';

import { SidePanel } from '@/components/layout/SidePanel';
import { FeatureCard } from '@/components/shared/FeatureCard';
import { styled } from '@mui/material/styles';
import Link from 'next/link';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import HomeIcon from '@mui/icons-material/Home';
import SavingsIcon from '@mui/icons-material/Savings';
import CreditCardIcon from '@mui/icons-material/CreditCard';

const PageContainer = styled('div')({
  display: 'flex',
  minHeight: '100vh',
});

const MainContent = styled('main')({
  marginLeft: '64px',
  marginTop: '64px',
  flex: 1,
  padding: '32px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
});

const CardsContainer = styled('div')({
  display: 'flex',
  flexWrap: 'wrap',
  width: '100%',
  maxWidth: '1200px',
  gap: '24px',
  justifyContent: 'center',
  alignContent: 'flex-start',
});

const CardWrapper = styled('div')({
  width: '280px',
  flex: '0 0 280px',
});

const calculators = [
  {
    title: 'Investment Returns',
    description: 'Calculate potential returns on investments with compound interest and recurring contributions.',
    icon: TrendingUpIcon,
    href: '/calculators/return-on-investment',
    color: '#4caf50'
  },
  {
    title: 'Loan Payment',
    description: 'Estimate monthly payments and total interest for various types of loans.',
    icon: DirectionsCarIcon,
    href: '/calculators/loan',
    color: '#2196f3'
  },
  {
    title: 'Mortgage',
    description: 'Calculate mortgage payments, including principal, interest, taxes, and insurance.',
    icon: HomeIcon,
    href: '/calculators/mortgage',
    color: '#9c27b0'
  },
  {
    title: 'Savings Goal',
    description: 'Plan how much you need to save regularly to reach your financial goals.',
    icon: SavingsIcon,
    href: '/calculators/savings',
    color: '#ff9800'
  },
  {
    title: 'Credit Card Payoff',
    description: 'Determine how long it will take to pay off credit card debt with different payment strategies.',
    icon: CreditCardIcon,
    href: '/calculators/credit',
    color: '#f44336'
  },
];

export default function CalculatorsPage() {
  return (
    <PageContainer>
      <SidePanel />
      <MainContent>
        <CardsContainer>
          {calculators.map((calc) => (
            <CardWrapper key={calc.title}>
              <Link href={calc.href} style={{ display: 'block', height: '100%' }}>
                <FeatureCard
                  title={calc.title}
                  description={calc.description}
                  icon={calc.icon}
                  color={calc.color}
                />
              </Link>
            </CardWrapper>
          ))}
        </CardsContainer>
      </MainContent>
    </PageContainer>
  );
} 