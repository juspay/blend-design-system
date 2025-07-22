'use strict'
var __createBinding =
    (this && this.__createBinding) ||
    (Object.create
        ? function (o, m, k, k2) {
              if (k2 === undefined) k2 = k
              var desc = Object.getOwnPropertyDescriptor(m, k)
              if (
                  !desc ||
                  ('get' in desc
                      ? !m.__esModule
                      : desc.writable || desc.configurable)
              ) {
                  desc = {
                      enumerable: true,
                      get: function () {
                          return m[k]
                      },
                  }
              }
              Object.defineProperty(o, k2, desc)
          }
        : function (o, m, k, k2) {
              if (k2 === undefined) k2 = k
              o[k2] = m[k]
          })
var __setModuleDefault =
    (this && this.__setModuleDefault) ||
    (Object.create
        ? function (o, v) {
              Object.defineProperty(o, 'default', {
                  enumerable: true,
                  value: v,
              })
          }
        : function (o, v) {
              o['default'] = v
          })
var __importStar =
    (this && this.__importStar) ||
    (function () {
        var ownKeys = function (o) {
            ownKeys =
                Object.getOwnPropertyNames ||
                function (o) {
                    var ar = []
                    for (var k in o)
                        if (Object.prototype.hasOwnProperty.call(o, k))
                            ar[ar.length] = k
                    return ar
                }
            return ownKeys(o)
        }
        return function (mod) {
            if (mod && mod.__esModule) return mod
            var result = {}
            if (mod != null)
                for (var k = ownKeys(mod), i = 0; i < k.length; i++)
                    if (k[i] !== 'default') __createBinding(result, mod, k[i])
            __setModuleDefault(result, mod)
            return result
        }
    })()
var __importDefault =
    (this && this.__importDefault) ||
    function (mod) {
        return mod && mod.__esModule ? mod : { default: mod }
    }
Object.defineProperty(exports, '__esModule', { value: true })
exports.api = void 0
const functions = __importStar(require('firebase-functions'))
const express_1 = __importDefault(require('express'))
const middleware_1 = require('./lib/middleware')
const users_1 = __importDefault(require('./api/users'))
const deployments_1 = __importDefault(require('./api/deployments'))
const npm_1 = __importDefault(require('./api/npm'))
// Create Express app
const app = (0, express_1.default)()
// Apply middleware
app.use(middleware_1.corsHandler)
app.use(express_1.default.json())
// Mount routers
app.use('/api/users', users_1.default)
app.use('/api/deployments', deployments_1.default)
app.use('/api/npm', npm_1.default)
// Error handling
app.use(middleware_1.errorHandler)
// Export the Express app as a Cloud Function
exports.api = functions.https.onRequest(app)
// You can also export individual functions if needed
// export const userRole = functions.https.onRequest(usersRouter);
//# sourceMappingURL=index.js.map
