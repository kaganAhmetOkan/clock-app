import Alarms from "@/components/Alarms/Alarms";

export default function AlarmsPage({ searchParams }) {
  return (
    <main>
      <Alarms searchParams={searchParams} />
    </main>
  );
};