#pragma once

#include <memory>
#include <utility>

#include <jsi/jsi.h>

#include <JsiSkHostObjects.h>

#pragma clang diagnostic push
#pragma clang diagnostic ignored "-Wdocumentation"

#include <modules/svg/include/SkSVGDOM.h>

#include <values/RNSkReadonlyValue.h>

#pragma clang diagnostic pop

namespace RNSkia {

    using namespace facebook;

    class Node {
    protected:
        std::vector<Node*> children;
    public:
        Node() {}
        void appendChild(Node* node) {
            children.push_back(node);
        }


        virtual void render(SkCanvas* canvas, SkPaint* paint) {
            for (auto it = children.begin() ; it != children.end(); ++it) {
                (*it)->render(canvas, paint);
            }
        }
    };

    class NodeCanvas: public Node {
    public:
        NodeCanvas(): Node() {}

    };

    class NodeCircle: public Node {
    private:
        jsi::Runtime &runtime;
        jsi::Object props;
    public:
        NodeCircle(jsi::Runtime &runtime, jsi::Object &props): Node(), runtime(runtime), props(std::move(props)) {}

        void render(SkCanvas* canvas, SkPaint* paint) {
            auto r = props.getProperty(runtime, "r");
            auto jsiCx = props.getProperty(runtime, "cx");
            double cx = 0;
            if (jsiCx.isObject()) {
                cx = jsiCx.asObject(runtime)
                        .asHostObject<RNSkReadonlyValue>(runtime)
                        ->getCurrent(runtime).asNumber();
            } else {
                cx = jsiCx.asNumber();
            }
            auto cy = props.getProperty(runtime, "cy");
            auto p = JsiSkPaint::fromValue(runtime, props.getProperty(runtime, "paint"));
            canvas->drawCircle(cx, cy.asNumber(), r.asNumber(), *p);
        }
    };

    class JsiSkNode: public JsiSkWrappingSharedPtrHostObject<Node> {
    public:

        JsiSkNode(std::shared_ptr<RNSkPlatformContext> context, std::shared_ptr<Node> node)
        : JsiSkWrappingSharedPtrHostObject<Node>(
                context, std::move(node)){};

        JSI_PROPERTY_GET(__typename__) {
          return jsi::String::createFromUtf8(runtime, "Node");
        }

        JSI_EXPORT_PROPERTY_GETTERS(JSI_EXPORT_PROP_GET(JsiSkNode, __typename__))

        JSI_HOST_FUNCTION(appendChild) {
            auto node = JsiSkNode::fromValue(runtime, arguments[0]);
            getObject()->appendChild(node.get());
            return jsi::Value::undefined();
        }

        JSI_EXPORT_FUNCTIONS(JSI_EXPORT_FUNC(JsiSkNode, appendChild))


        /**
          Returns the underlying object from a host object of this type
         */
        static std::shared_ptr<Node> fromValue(jsi::Runtime &runtime,
                                         const jsi::Value &obj) {
            return obj.asObject(runtime)
                    .asHostObject<JsiSkNode>(runtime)
                    ->getObject();
        }
    };

} // namespace RNSkia
