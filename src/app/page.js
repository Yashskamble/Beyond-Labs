import dynamic from "next/dynamic";

const WebsiteTable = dynamic(() => import("@/components/organisms/Table"));

export default async function MyWebsite() {
  return (
    <div className="my-6 mx-10 lg:mx-20">
      <h2 className="text-[24px] leading-[40px] font-semibold tracking-normal">
        All websites
      </h2>
      <WebsiteTable />
    </div>
  );
}
