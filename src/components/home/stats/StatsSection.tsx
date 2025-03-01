import { useStats } from '../../../hooks/useStats';
import { StatsCounter } from './StatsCounter';
import { Container } from '../../ui/Container';

export function StatsSection() {
  const stats = useStats();

  return (
    <section className="relative -mt-12 mb-12">
      <Container>
        <StatsCounter stats={stats} />
      </Container>
    </section>
  );
}