export default function formateDate(createdAt) {
  return new Date(createdAt).toDateString().slice(3);
}
