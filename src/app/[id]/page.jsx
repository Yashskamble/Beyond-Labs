import dynamic from "next/dynamic";

const Form = dynamic(() => import("@/components/organisms/Form"));

export default function AddWebsite() {
  return (
    <section className="my-6 mx-10 lg:mx-20">
      <Form />
    </section>
  );
}
