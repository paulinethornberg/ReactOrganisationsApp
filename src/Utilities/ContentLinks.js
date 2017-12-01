export function resolveContentLink(link) {
  switch (link.type) {
    case "article":
      return "/articles/" + link.url_slug;
    case "organisationSlug":
      return "/organisations/" + link.url_slug;
    default:
      return "";
  }
}