import { Section } from '@/components/common/section';
import ExpItem from './exp-item';
import { experiences } from '@/configs/experience';

export const ExpList = () => {
  return (
    <Section>
      {experiences.map((item) => (
        <ExpItem key={item.title} {...item} />
      ))}
    </Section>
  );
};
