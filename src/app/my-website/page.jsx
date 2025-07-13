import dynamic from "next/dynamic";

const WebsiteTable = dynamic(() => import("@/components/organisms/Table"));

export default async function MyWebsite() {
  return (
    <div className="mx-10 lg:mx-20 my-6">
      <h2 className="font-semibold text-[24px] leading-[40px] tracking-normal">
        All websites
      </h2>
      <WebsiteTable />
    </div>
  );
}
