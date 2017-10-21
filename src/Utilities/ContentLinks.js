export function resolveContentLink(link) {
  switch (link.type) {
    case "article":
      return "/articles/" + link.url_slug;
    case "organisation":
      return "/store/organisation/" + link.url_slug;
    default:
      return "";
  }
}