/**
 * Return on Investment Calculator Page
 * 
 * Layout Structure:
 * - PageContainer: Handles full-page layout with sidebar
 * - MainContent: Adapts width based on sidebar state
 * - Box: Main content wrapper with consistent styling
 * 
 * Component Hierarchy:
 * 1. Title: Simple text header for the calculator (0px top, 24px bottom margin)
 * 2. Beta Tag: Indicates development status to users
 * 3. Description: Explains calculator's purpose
 * 
 * Each component is a direct child of Box for proper spacing and alignment.
 */

'use client';

import { SidePanel } from '@/components/layout/SidePanel';
import { BoxTitle } from '@/components/shared/BoxTitle';
import { MetadataTag } from '@/components/shared/MetadataTag';
import { LabelTag } from '@/components/shared/LabelTag';
import { styled } from '@mui/material/styles';
import { Divider } from '@mui/material';
import { ResultBox } from '@/components/shared/ResultBox';
import { Box } from '@/components/layout/Box';
import { MoneyInput } from '@/components/shared/MoneyInput';
import { PercentageInput } from '@/components/shared/PercentageInput';
import { NumberInput } from '@/components/shared/NumberInput';
import { Dropdown } from '@/components/shared/Dropdown';
import { MenuItem } from '@mui/material';
import { ClearForm } from '@/components/shared/ClearForm';
import { useROICollector, roiInputs } from '@/agents/collectors/roiCollector';
import { useROIPublisher } from '@/agents/publishers/roiPublisher';
import { useState } from 'react';

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

const TitleSection = styled('div')({
  marginBottom: '5px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: '16px'
});

const MetadataSection = styled('div')({
  marginBottom: '24px'
});

const InputSection = styled('div')({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: '16px',
  '& > :first-of-type': {
    flex: '1 1 60%',
    minWidth: '200px'
  },
  '& > :last-child': {
    flex: '0 0 140px'
  }
});

const ResultSection = styled('div')({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: '16px',
  '& > :first-of-type': {
    flex: '1 1 60%',
    minWidth: '200px'
  },
  '& > :last-child': {
    flex: '0 0 140px'
  }
});

const InputsContainer = styled('div')({
  padding: '24px',
  borderRadius: '12px',
  flex: '1',
  minWidth: '400px',
  display: 'flex',
  flexDirection: 'column',
  gap: '12px'
});

const ResultsContainer = styled('div')(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' 
    ? theme.palette.background.paper
    : theme.palette.grey[200],
  padding: '24px',
  borderRadius: '12px',
  flex: '1',
  minWidth: '400px',
  display: 'flex',
  flexDirection: 'column',
  gap: '12px'
}));

const ContentContainer = styled('div')({
  display: 'flex',
  gap: '24px',
  width: '100%',
  alignItems: 'stretch',
  '@media (max-width: 1024px)': {
    flexDirection: 'column'
  }
});

export default function ReturnOnInvestmentPage() {
  const {
    values,
    updateInitialInvestment,
    updateRecurringAmount,
    updateRecurringInterval,
    updateAnnualIncreasePercent,
    updateReturnRate,
    updateDuration,
    updateInflationRate,
    resetInputs
  } = useROICollector();

  const [results, setResults] = useState({
    totalInvested: '$0',
    totalReturn: '$0',
    totalValue: '$0',
    inflationAdjusted: '$0',
    savingsAlternative: '$0'
  });

  // Use the publisher to update results
  useROIPublisher({
    inputs: values,
    onUpdateResults: setResults
  });

  return (
    <PageContainer>
      <SidePanel />
      <MainContent>
        <Box>
          <TitleSection>
            <BoxTitle
              align="left"
              textStyle={{
                size: '24px',
                weight: 600
              }}
            >
              Return on Investment Calculator
            </BoxTitle>
            <ClearForm onClear={resetInputs} />
          </TitleSection>

          <MetadataSection>
            <span style={{ marginRight: '8px' }}>
              <MetadataTag 
                label="average return"
                tooltip="Average return on the investment over the duration of the investment period. In reality, returns vary year to year but over time, they average out."
                align="left"
              />
            </span>
            <span style={{ marginRight: '8px' }}>
              <MetadataTag 
                label="adjusted for inflation"
                tooltip="The total value of the investment after the duration of the investment period is also adjusted for inflation."
                align="left"
              />
            </span>
          </MetadataSection>

          <Divider sx={{ my: 1 }} />

          <ContentContainer>
            <InputsContainer>
              <InputSection>
                <LabelTag 
                  label="Initial Investment:"
                  tooltip="A one-time investment made at the beginning of the investment period."
                />
                <MoneyInput 
                  value={values.initialInvestment} 
                  onChange={updateInitialInvestment} 
                />
              </InputSection>
              
              <InputSection>
                <LabelTag 
                  label="Recurring Contribution:"
                  tooltip="A regular investment made at a fixed interval."
                />
                <MoneyInput 
                  value={values.recurringAmount} 
                  onChange={updateRecurringAmount} 
                />
              </InputSection>

              <InputSection>
                <LabelTag 
                  label="Recurring Interval:"
                  tooltip="The frequency at which contributions are made."
                />
                <Dropdown 
                  value={values.recurringInterval} 
                  onChange={(e) => updateRecurringInterval(e.target.value as roiInputs['recurringInterval'])}
                >
                  <MenuItem value="DAILY">Daily</MenuItem>
                  <MenuItem value="WEEKLY">Weekly</MenuItem>
                  <MenuItem value="MONTHLY">Monthly</MenuItem>
                  <MenuItem value="QUARTERLY">Quarterly</MenuItem>
                  <MenuItem value="SEMI_ANNUALLY">Semi-annually</MenuItem>
                  <MenuItem value="ANNUALLY">Annually</MenuItem>
                </Dropdown>
              </InputSection>

              <InputSection>
                <LabelTag 
                  label="Annual Increase:"
                  tooltip="The percentage you increase your investment contributions each year."
                />
                <PercentageInput 
                  value={values.annualIncreasePercent} 
                  onChange={updateAnnualIncreasePercent} 
                />
              </InputSection>

              <InputSection>
                <LabelTag 
                  label="Return Rate:"
                  tooltip="The annual rate of return for the investment."
                />
                <PercentageInput 
                  value={values.returnRate} 
                  onChange={updateReturnRate} 
                />
              </InputSection>

              <InputSection>
                <LabelTag 
                  label="Investment Duration:"
                  tooltip="The total duration of the investment period in years."
                />
                <NumberInput 
                  value={values.duration} 
                  onChange={updateDuration} 
                />
              </InputSection>

              <InputSection>
                <LabelTag 
                  label="Inflation Rate:"
                  tooltip="The annual rate of inflation."
                />
                <PercentageInput 
                  value={values.inflationRate} 
                  onChange={updateInflationRate} 
                />
              </InputSection>
            </InputsContainer>

            <ResultsContainer>
              <ResultSection>
                <LabelTag 
                  label="Total Invested:"
                  tooltip="The total amount invested over the duration of the investment period."
                />
                <ResultBox type="neutral">
                  {results.totalInvested}
                </ResultBox>
              </ResultSection>

              <ResultSection>
                <LabelTag 
                  label="Total Return:"
                  tooltip="The total return on the investment over the duration of the investment period."
                />
                <ResultBox type="gain">
                  {results.totalReturn}
                </ResultBox>
              </ResultSection>

            <ResultSection>
              <LabelTag 
                label="Total Value:"
                tooltip="The total value of the investment after the duration of the investment period."
              />
              <ResultBox type="gain">
                {results.totalValue}
              </ResultBox>
            </ResultSection>

              <ResultSection>
                <LabelTag 
                  label="Adjusted for Inflation:"
                  tooltip="The total value of the investment after the duration of the investment period, adjusted for inflation."
                />
                <ResultBox type="loss">
                  {results.inflationAdjusted}
                </ResultBox>
              </ResultSection>

              <ResultSection>
                <LabelTag 
                  label="Savings Alternative:"
                  tooltip="What your money would be worth if you'd saved it instead of investing."
                />
                <ResultBox type="warning">
                  {results.savingsAlternative}
                </ResultBox>
              </ResultSection>
            </ResultsContainer>
          </ContentContainer>
        </Box>
      </MainContent>
    </PageContainer>
  );
}