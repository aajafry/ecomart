import Layout from "./Layout";

function withLayout(Component) {
  return (
    <Layout>
      <Component />
    </Layout>
  );
}

export default withLayout