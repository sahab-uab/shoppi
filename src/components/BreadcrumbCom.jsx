import Link from "next/link";

export default function BreadcrumbCom({
  paths = [{ name: "home", path: "/" }],
}) {
  return (
    <>
      {paths && paths.length > 0 && (
        <div key={Math.random()}>
          <div className="breadcrumb-wrapper font-400 text-[13px] text-qblack mb-[23px] print:hidden">
            {paths.map((path) => (
              <span key={Math.random()}>
                <Link href={path.path}>
                  <span className="mx-1 capitalize">{path.name}</span>
                </Link>
                <span className="sperator">/</span>
              </span>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
