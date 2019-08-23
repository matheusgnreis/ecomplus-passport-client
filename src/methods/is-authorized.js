// it does not validate authentication token
// only checks session auth level
export default self => Boolean(self.session.auth && self.session.auth.level >= 2)
