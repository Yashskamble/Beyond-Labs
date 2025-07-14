import dynamic from "next/dynamic";

const Form = dynamic(() => import("@/components/organisms/Form"));

export default function AddWebsite() {
  return (
    <div className="mx-10 lg:mx-20 my-6">
      <Form />
    </div>
  );
}
