import { Container, InputRow, Label, TitleRow } from './styles';
import { MenuItem } from '@mui/material';
import { Dropdown } from '@/components/Dropdown';
import { MoneyInput } from '@/components/MoneyInput';
import { NumberInput } from '@/components/NumberInput';
import { PercentageInput } from '@/components/PercentageInput';
import { ResultBox } from '@/components/ResultBox';
import { calculateReturns } from '@/utils/ReturnCalcMath';
import { useState, useMemo } from 'react';
import { ClearForm } from '@/components/ClearForm';
import { MetadataTag } from '@/components/MetadataTag';
import { LabelTag } from '@/components/LabelTag';

const DEFAULT_VALUES = {
  initialInvestment: '',
  recurringInvestment: '',
  timeValue: '',
  timeUnit: 40,
  returnRate: '',
  recurringFrequency: 40,
  returnRateFrequency: 10
};

export const ReturnCalc = () => {
  const [initialInvestment, setInitialInvestment] = useState(DEFAULT_VALUES.initialInvestment);
  const [recurringInvestment, setRecurringInvestment] = useState(DEFAULT_VALUES.recurringInvestment);
  const [timeValue, setTimeValue] = useState(DEFAULT_VALUES.timeValue);
  const [timeUnit, setTimeUnit] = useState(DEFAULT_VALUES.timeUnit);
  const [returnRate, setReturnRate] = useState(DEFAULT_VALUES.returnRate);
  const [recurringFrequency, setRecurringFrequency] = useState(DEFAULT_VALUES.recurringFrequency);
  const [returnRateFrequency, setReturnRateFrequency] = useState(DEFAULT_VALUES.returnRateFrequency);

  const result = useMemo(() => {
    const inputs = {
      initialInvestment: parseFloat(initialInvestment) || 0,
      recurringInvestment: parseFloat(recurringInvestment) || 0,
      recurringFrequency,
      timeValue: Math.max(parseFloat(timeValue) || 0, 0),
      timeUnit,
      returnRate: parseFloat(returnRate) || 0,
      returnRateFrequency
    };
    
    if (inputs.timeValue === 0) {
      return {
        finalAmount: inputs.initialInvestment,
        totalInvested: inputs.initialInvestment,
        totalGains: 0
      };
    }
    
    return calculateReturns(inputs);
  }, [initialInvestment, recurringInvestment, recurringFrequency, 
      timeValue, timeUnit, returnRate, returnRateFrequency]);

  return (
    <Container>
      <TitleRow>
        <div>
          <h2>Return on Investment</h2>
          <p style={{ margin: 0 }}>
            <MetadataTag 
              label="stable return & recurring investment"
              tooltip="This calculator assumes an average rate of return and a stable recurring investment over the entire period. The idea is that, in reality, the return rate will fluctuate, but, over time, it will average out to the rate you enter. You should also increase your recurring investment over time to account for inflation and salary increases."
            />
          </p>
        </div>
        <ClearForm onClear={() => {
          setInitialInvestment(DEFAULT_VALUES.initialInvestment);
          setRecurringInvestment(DEFAULT_VALUES.recurringInvestment);
          setTimeValue(DEFAULT_VALUES.timeValue);
          setTimeUnit(DEFAULT_VALUES.timeUnit);
          setReturnRate(DEFAULT_VALUES.returnRate);
          setRecurringFrequency(DEFAULT_VALUES.recurringFrequency);
          setReturnRateFrequency(DEFAULT_VALUES.returnRateFrequency);
        }} />
      </TitleRow>
      <InputRow>
        <Label>
          <LabelTag 
            label="Initial Investment"
            tooltip="A one-time, initial investment to fund your account."
          />
          :
        </Label>
        <MoneyInput
          value={initialInvestment}
          onChange={setInitialInvestment}
        />
      </InputRow>

      <InputRow>
        <Label>
          <LabelTag 
            label="Recurring Investment"
            tooltip="The amount of money you plan on repeatedly investing and the frequency at which you'll invest it."
          />
          :
        </Label>
        <Dropdown 
          value={recurringFrequency}
          onChange={(e) => setRecurringFrequency(Number(e.target.value))}
        >
          <MenuItem value={10}>Annual</MenuItem>
          <MenuItem value={20}>Semiannual</MenuItem>
          <MenuItem value={30}>Quarterly</MenuItem>
          <MenuItem value={40}>Monthly</MenuItem>
          <MenuItem value={50}>Weekly</MenuItem>
          <MenuItem value={60}>Daily</MenuItem>
          <MenuItem value={70}>Continuously</MenuItem>
        </Dropdown>
        <MoneyInput
          value={recurringInvestment}
          onChange={setRecurringInvestment}
        />
      </InputRow>

      <InputRow>
        <Label>
          <LabelTag 
            label="Time Period"
            tooltip="How long you will commit to investing and not withdrawing your funds."
          />
          :
        </Label>
        <NumberInput
          value={timeValue}
          onChange={setTimeValue}
        />
        <Dropdown
          value={timeUnit}
          onChange={(e) => setTimeUnit(Number(e.target.value))}
        >
          <MenuItem value={10}>Days</MenuItem>
          <MenuItem value={20}>Weeks</MenuItem>
          <MenuItem value={30}>Months</MenuItem>
          <MenuItem value={40}>Years</MenuItem>
        </Dropdown>
      </InputRow>

      <InputRow>
        <Label>
          <LabelTag 
            label="Return Rate"
            tooltip="The expected rate of return on your investments and the frequency with which you expect the interest to compound. For most investments, set the rate to 10% and leave the frequency at annual."
          />
          :
        </Label>
        <PercentageInput
          value={returnRate}
          onChange={setReturnRate}
        />
        <Dropdown
          value={returnRateFrequency}
          onChange={(e) => setReturnRateFrequency(Number(e.target.value))}
        >
          <MenuItem value={10}>Annual</MenuItem>
          <MenuItem value={20}>Semiannual</MenuItem>
          <MenuItem value={30}>Quarterly</MenuItem>
          <MenuItem value={40}>Monthly</MenuItem>
          <MenuItem value={50}>Weekly</MenuItem>
          <MenuItem value={60}>Daily</MenuItem>
          <MenuItem value={70}>Continuously</MenuItem>
        </Dropdown>
      </InputRow>

      <InputRow>
        <Label>
          <LabelTag 
            label="Final Amount"
            tooltip="The total value of your investment at the end of the time period, including both your contributions and investment returns."
          />
          :
        </Label>
        <ResultBox>${result.finalAmount.toLocaleString()}</ResultBox>
      </InputRow>

      <InputRow>
        <Label>
          <LabelTag 
            label="Total Invested"
            tooltip="The sum of your initial investment and all recurring contributions, not including any returns."
          />
          :
        </Label>
        <ResultBox>${result.totalInvested.toLocaleString()}</ResultBox>
      </InputRow>

      <InputRow>
        <Label>
          <LabelTag 
            label="Total Gains"
            tooltip="The profit from your investments - the difference between your final amount and total invested."
          />
          :
        </Label>
        <ResultBox>${result.totalGains.toLocaleString()}</ResultBox>
      </InputRow>
    </Container>
  );
};

export default ReturnCalc;