// it does not validate authentication token
// only checks session auth level
export default self => self.session.auth && self.session.auth.level >= 2
