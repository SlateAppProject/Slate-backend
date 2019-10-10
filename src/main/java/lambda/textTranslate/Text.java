package lambda.textTranslate;

public class Text {

    private  String message;
    private  String source;
    private  String destination;


    public Text(String message, String source, String destination) {
        this.message = message;
        this.source = source;
        this.destination = destination;
    }

    public Text() {
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public String getSource() {
        return source;
    }

    public void setSource(String source) {
        this.source = source;
    }

    public String getDestination() {
        return destination;
    }

    public void setDestination(String destination) {
        this.destination = destination;
    }
}
