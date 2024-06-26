from django.http import JsonResponse


class Process500:
    def __init__(self, get_response):
        self._get_response = get_response

    def __call__(self, request):
        return self._get_response(request)

    def process_exception(self, request, exception):
        if hasattr(exception, 'message'):
            exception = exception.message
        return JsonResponse({'detail': str(exception)}, status=500)
