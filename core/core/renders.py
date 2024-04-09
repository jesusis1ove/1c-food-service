from rest_framework.renderers import JSONRenderer


class MainJSONRenderer(JSONRenderer):

    def render(self, data, accepted_media_type=None, renderer_context=None):
        status_code = renderer_context['response'].status_code
        response = {
            "results": data,
        }

        if not str(status_code).startswith('2'):
            response.update({'detail': response.pop('results')})
            try:
                response["detail"] = data["detail"]
            except KeyError:
                response["detail"] = data

        return super(MainJSONRenderer, self).render(response, accepted_media_type, renderer_context)
