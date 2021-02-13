import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Random;
import java.util.Scanner;

public class Tic_Tac_Toe {
    static ArrayList<Integer> user_moves = new ArrayList<Integer>();
    static ArrayList<Integer> cpu_moves = new ArrayList<Integer>();
    public static void main(String[] args){
        
        

        char [][] board = {
            {' ', '|',' ','|',' '},
            {'-', '+','-','+','-'},
            {' ', '|',' ','|',' '},
            {'-', '+','-','+','-'},
            {' ', '|',' ','|',' '}};
        
        while(true){
            Scanner user = new Scanner(System.in);
            int user_move = user.nextInt();
            while(user_moves.contains(user_move) || cpu_moves.contains(user_move)){
                System.out.println("illegal move");
                user_move = user.nextInt();
            }
            place_piece(board, user_move, "player");
            Random rand =  new Random();
            int Randon_move = rand.nextInt(9) + 1;
            while(user_moves.contains(Randon_move) || cpu_moves.contains(Randon_move)){
                Randon_move = rand.nextInt(9) + 1;
            }
            place_piece(board, Randon_move, "cpu");
            print_gameBoard(board);
            String gameCall = check_win();
            if(!gameCall.isEmpty()) {
                System.out.println(gameCall);
                break;
            }
        }
    }

    public static String check_win(){
        
        List topRow = Arrays.asList(1,2,3);
        List midRow = Arrays.asList(4,5,6);
        List botRow = Arrays.asList(7,8,9);
        List leftCol = Arrays.asList(1,4,7);
        List midCol = Arrays.asList(2,5,8);
        List rightCol = Arrays.asList(3,6,9);
        List cross1 = Arrays.asList(1,5,9);
        List cross2 = Arrays.asList(3,5,7);

        List<List> winning_method = new ArrayList<List>();
        winning_method.add(topRow);
        winning_method.add(midRow);
        winning_method.add(botRow);
        winning_method.add(leftCol);
        winning_method.add(midCol);
        winning_method.add(rightCol);
        winning_method.add(cross1);
        winning_method.add(cross2);

        for(List l: winning_method){
            if(user_moves.containsAll(l)){
                return "YOU WON";
            }else if(cpu_moves.containsAll(l)){
                return "CPU WON";
            }else if(user_moves.size() + cpu_moves.size() == 9){
                return "TIE";
            }
        }

        return "";
    }

    public static void place_piece(char[][] board, int position, String player){
        char current_piece = ' ';
        if(player.equals("player")){
            user_moves.add(position);
            current_piece = 'X';
        }else if(player.equals("cpu")){
            cpu_moves.add(position);
            current_piece = 'O';
        }

        switch(position){
            case 1:
                board[0][0] = current_piece; 
                break;
            case 2:
                board[0][2] = current_piece;
                break;
            case 3:
                board[0][4] = current_piece;
                break;
            case 4:
                board[2][0] = current_piece; 
                break;
            case 5:
                board[2][2] = current_piece; 
                break;
            case 6:
                board[2][4] = current_piece; 
                break;
            case 7:
                board[4][0] = current_piece; 
                break;
            case 8:
                board[4][2] = current_piece; 
                break;
            case 9:
                board[4][4] = current_piece; 
                break;
            default:
                break;
        }
    }

    public static void print_gameBoard(char [][] board){
        for(char[] row: board){
            for(char item: row){
                System.out.print(item);
            }
            System.out.println();
        }
    }
}