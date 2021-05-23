import { Wrap, WrapItem } from "@chakra-ui/layout";

function CardWrapper({ children, cardList, spacing }) {
  return (
    <Wrap spacing={spacing}>
      {cardList.map((card) => (
        <WrapItem key={card.id}>
          <Link href={`/blog/${card.id}`}>
            <a>{children}</a>
          </Link>
        </WrapItem>
      ))}
    </Wrap>
  );
}

export default CardWrapper;
