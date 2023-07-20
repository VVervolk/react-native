export default function toggleHidePassword(condition, setter) {
  if (condition) {
    setter(false);
  } else {
    setter(true);
  }
}
