interface RouteWrapperProps {
  layout: React.FC<{ children: React.ReactNode }>;
  element: React.FC;
}

export const RouteWrapper: React.FC<RouteWrapperProps> = ({
  layout: Layout,
  element: Element,
}) => {
  return (
    <Layout>
      <Element />
    </Layout>
  );
};
