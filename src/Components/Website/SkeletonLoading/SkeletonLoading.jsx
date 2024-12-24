import Skeleton from 'react-loading-skeleton';

export default function SkeletonLoading(props) {
  const { count, height, width, customClasses } = props;
  const skeleton = Array.from({ length: count }, (_, i) => i + 1).map((item) => (
    <div className={customClasses} key={item}>
      <Skeleton
        height={height}
        width={width}
        baseColor="#f9f9f9"
        duration={1}
        highlightColor="#ff562215"
        borderRadius={0.375 * 16}
      />
    </div>
  ));

  return skeleton;
}
